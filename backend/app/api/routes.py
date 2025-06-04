import logging
from typing import Any, Dict, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from passlib.hash import bcrypt
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..db.database import get_db
from ..models.users import Applicant, Course, Subscriber, University, User
from ..schemas.payment import PaymentCreate, PaymentResponse
from ..schemas.subscriber import SubscriberCreate, SubscriberResponse
from ..schemas.user import ApplicantCreate, ApplicantResponse
from ..services.intasend_service import IntaSendService
from ..services.payment_service import PaymentService
from ..utils.password import generate_secure_password

logger = logging.getLogger(__name__)


app = APIRouter()


def generate_username(first_name, last_name):
    """Generate a unique username."""
    return f"{first_name.lower()}.{last_name.lower()}"


@app.post("/applications", response_model=ApplicantResponse)
def create_application(applicant: ApplicantCreate, db: Session = Depends(get_db)):
    # Check if email/phone already exists
    existing_user = db.query(User).filter(User.email == applicant.email_phone).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email/phone already exists")

    # Validate course ID
    course = db.query(Course).filter(Course.id == applicant.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Fetch or create university by name
    university = db.query(University).filter(University.name == applicant.university_name).first()
    if not university:
        university = University(name=applicant.university_name)
        db.add(university)
        db.commit()
        db.refresh(university)

    # Create user account
    username = generate_username(applicant.first_name, applicant.last_name)
    hashed_password = bcrypt.hash(generate_secure_password())
    new_user = User(
        username=username,
        first_name=applicant.first_name,
        last_name=applicant.last_name,
        email=applicant.email_phone,
        password=hashed_password,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create applicant record
    new_applicant = Applicant(
        first_name=applicant.first_name,
        last_name=applicant.last_name,
        email_phone=applicant.email_phone,
        dob=applicant.dob,
        course_id=applicant.course_id,
        university_id=university.id,
        essay=applicant.essay,
        user_id=new_user.id,
    )
    db.add(new_applicant)
    db.commit()
    db.refresh(new_applicant)

    return new_applicant


@app.post("/subscribe", response_model=SubscriberResponse)
def create_subscriber(subscriber: SubscriberCreate, db: Session = Depends(get_db)):
    """
    Endpoint to create a new subscriber.
    """
    new_subscriber = Subscriber(email=subscriber.email)

    try:
        db.add(new_subscriber)
        db.commit()
        db.refresh(new_subscriber)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already subscribed")

    return new_subscriber


router = APIRouter(prefix="/payments", tags=["payments"])

def get_payment_service(db: Session = Depends(get_db)) -> PaymentService:
    """Dependency to get payment service"""
    return PaymentService(db)

@router.post("/create", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
async def create_payment(
    payment_data: PaymentCreate,
    payment_service: PaymentService = Depends(get_payment_service)
):
    """
    Create a new payment request
    
    - **amount**: Payment amount (must be greater than 0)
    - **currency**: Currency code (default: KES)
    - **narrative**: Payment description
    - **payment_method**: Payment method (MPESA, CARD, BANK)
    - **redirect_url**: URL to redirect after payment (optional)
    - **customer**: Customer details (optional)
    - **metadata**: Additional metadata (optional)
    
    Returns payment details including payment URL for redirect
    """
    try:
        return payment_service.create_payment(payment_data)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error creating payment: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while creating payment"
        )

@router.get("/verify/{invoice_id}")
async def verify_payment(
    invoice_id: str,
    payment_service: PaymentService = Depends(get_payment_service)
):
    """
    Verify payment status with IntaSend
    
    - **invoice_id**: Invoice ID from payment creation
    
    Returns current payment status and details
    """
    try:
        return payment_service.verify_payment(invoice_id)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error verifying payment: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while verifying payment"
        )

@router.get("/status/{invoice_id}")
async def get_payment_status(
    invoice_id: str,
    payment_service: PaymentService = Depends(get_payment_service)
):
    """
    Get payment status from local database
    
    - **invoice_id**: Invoice ID from payment creation
    
    Returns payment details from local database
    """
    try:
        payment = payment_service.get_payment_by_invoice_id(invoice_id)
        if not payment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Payment not found"
            )
        
        return {
            "invoice_id": payment.invoice_id,
            "payment_id": payment.id,
            "status": payment.status,
            "amount": payment.amount,
            "currency": payment.currency,
            "payment_method": payment.payment_method,
            "customer_email": payment.customer_email,
            "customer_phone": payment.customer_phone,
            "metadata": payment.metadata,
            "created_at": payment.created_at,
            "updated_at": payment.updated_at
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting payment status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving payment status"
        )

@router.post("/webhook")
async def handle_webhook(
    request: Request,
    payment_service: PaymentService = Depends(get_payment_service)
):
    """
    Handle IntaSend webhook notifications
    
    This endpoint receives payment status updates from IntaSend
    """
    try:
        webhook_data = await request.json()
        logger.info(f"Received webhook: {webhook_data}")
        
        result = payment_service.handle_webhook(webhook_data)
        
        return {
            "status": "success",
            "message": "Webhook processed successfully",
            "data": result
        }
        
    except Exception as e:
        logger.error(f"Error processing webhook: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error processing webhook"
        )

@router.get("/customer/{customer_email}")
async def get_customer_payments(
    customer_email: str,
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    payment_service: PaymentService = Depends(get_payment_service)
):
    """
    Get payments for a specific customer
    
    - **customer_email**: Customer email address
    - **limit**: Number of payments to return (1-100, default: 10)
    - **offset**: Number of payments to skip (default: 0)
    
    Returns list of customer payments
    """
    try:
        payments = payment_service.get_user_payments(customer_email, limit, offset)
        
        return {
            "customer_email": customer_email,
            "payments": [
                {
                    "invoice_id": payment.invoice_id,
                    "payment_id": payment.id,
                    "amount": payment.amount,
                    "currency": payment.currency,
                    "status": payment.status,
                    "payment_method": payment.payment_method,
                    "created_at": payment.created_at,
                    "updated_at": payment.updated_at
                }
                for payment in payments
            ],
            "total": len(payments),
            "limit": limit,
            "offset": offset
        }
        
    except Exception as e:
        logger.error(f"Error getting customer payments: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving customer payments"
        )

@router.get("/by-status/{status}")
async def get_payments_by_status(
    status: str,
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    payment_service: PaymentService = Depends(get_payment_service)
):
    """
    Get payments by status
    
    - **status**: Payment status (e.g., PENDING, COMPLETED, FAILED)
    - **limit**: Number of payments to return (1-100, default: 10)
    - **offset**: Number of payments to skip (default: 0)
    
    Returns list of payments with specified status
    """
    try:
        payments = payment_service.get_payments_by_status(status, limit, offset)
        
        return {
            "status": status,
            "payments": [
                {
                    "invoice_id": payment.invoice_id,
                    "payment_id": payment.id,
                    "amount": payment.amount,
                    "currency": payment.currency,
                    "payment_method": payment.payment_method,
                    "customer_email": payment.customer_email,
                    "customer_phone": payment.customer_phone,
                    "created_at": payment.created_at,
                    "updated_at": payment.updated_at
                }
                for payment in payments
            ],
            "total": len(payments),
            "limit": limit,
            "offset": offset
        }
        
    except Exception as e:
        logger.error(f"Error getting payments by status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving payments by status"
        )

@router.get("/methods")
async def get_payment_methods():
    """
    Get supported payment methods
    
    Returns list of supported payment methods from IntaSend
    """
    try:
        intasend = IntaSendService()
        methods = intasend.get_supported_payment_methods()
        
        return {
            "supported_methods": methods.get("methods", ["MPESA", "CARD", "BANK"]),
            "default_method": methods.get("default", "MPESA"),
            "currencies": ["KES", "USD"],  # Add more currencies as supported
            "message": "Supported payment methods retrieved successfully"
        }
        
    except Exception as e:
        logger.error(f"Error getting payment methods: {str(e)}")
        # Return default methods even if API call fails
        return {
            "supported_methods": ["MPESA", "CARD", "BANK"],
            "default_method": "MPESA",
            "currencies": ["KES", "USD"],
            "message": "Default payment methods (API unavailable)"
        }

@router.put("/update-status/{invoice_id}")
async def update_payment_status(
    invoice_id: str,
    new_status: str,
    metadata: Optional[Dict[str, Any]] = None,
    payment_service: PaymentService = Depends(get_payment_service)
):
    """
    Manually update payment status (Admin only - add authentication as needed)
    
    - **invoice_id**: Invoice ID of the payment
    - **new_status**: New payment status
    - **metadata**: Additional metadata to add (optional)
    
    Returns updated payment details
    """
    try:
        updated_payment = payment_service.update_payment_status(invoice_id, new_status, metadata)
        
        if not updated_payment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Payment not found"
            )
        
        return {
            "message": "Payment status updated successfully",
            "invoice_id": updated_payment.invoice_id,
            "old_status": "previous_status",  # You might want to track this
            "new_status": updated_payment.status,
            "updated_at": updated_payment.updated_at
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating payment status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error updating payment status"
        )
