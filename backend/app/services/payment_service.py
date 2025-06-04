import logging
from datetime import datetime
from typing import Any, Dict, List, Optional

from fastapi import HTTPException
from sqlalchemy.orm import Session

from ..models.payment import Payment
from ..schemas.payment import PaymentCreate, PaymentResponse
from .intasend_service import IntaSendService

logger = logging.getLogger(__name__)

class PaymentService:
    def __init__(self, db: Session):
        self.db = db
        self.intasend = IntaSendService()
    
    def create_payment(self, payment_data: PaymentCreate) -> PaymentResponse:
        """Create a new payment request"""
        try:
            # Create payment request with IntaSend
            intasend_response = self.intasend.create_payment_request(payment_data)
            
            # Extract data from IntaSend response
            invoice_id = intasend_response.get("invoice_id")
            payment_url = intasend_response.get("payment_url")
            status = intasend_response.get("status", "PENDING")
            payment_id = intasend_response.get("id")
            
            if not invoice_id:
                raise HTTPException(
                    status_code=500,
                    detail="Failed to create payment: Invalid response from payment gateway"
                )
            
            # Create payment record in database
            db_payment = Payment(
                id=payment_id or invoice_id,
                invoice_id=invoice_id,
                amount=payment_data.amount,
                currency=payment_data.currency,
                payment_method=payment_data.payment_method,
                status=status,
                customer_email=payment_data.customer.email if payment_data.customer else None,
                customer_phone=payment_data.customer.phone_number if payment_data.customer else None,
                metadata={
                    "narrative": payment_data.narrative,
                    "redirect_url": payment_data.redirect_url,
                    **(payment_data.metadata or {})
                },
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            
            self.db.add(db_payment)
            self.db.commit()
            self.db.refresh(db_payment)
            
            return PaymentResponse(
                invoice_id=invoice_id,
                payment_url=payment_url,
                status=status,
                amount=payment_data.amount,
                currency=payment_data.currency,
                payment_method=payment_data.payment_method,
                created_at=db_payment.created_at
            )
            
        except HTTPException:
            self.db.rollback()
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error creating payment: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail="An error occurred while creating the payment"
            )
    
    def get_payment_by_invoice_id(self, invoice_id: str) -> Optional[Payment]:
        """Get payment by invoice ID"""
        return self.db.query(Payment).filter(Payment.invoice_id == invoice_id).first()
    
    def get_payment_by_id(self, payment_id: str) -> Optional[Payment]:
        """Get payment by payment ID"""
        return self.db.query(Payment).filter(Payment.id == payment_id).first()
    
    def update_payment_status(self, invoice_id: str, status: str, metadata: Optional[Dict] = None) -> Optional[Payment]:
        """Update payment status"""
        try:
            payment = self.get_payment_by_invoice_id(invoice_id)
            if not payment:
                return None
            
            payment.status = status
            payment.updated_at = datetime.now()
            
            if metadata:
                current_metadata = payment.metadata or {}
                current_metadata.update(metadata)
                payment.metadata = current_metadata
            
            self.db.commit()
            self.db.refresh(payment)
            
            return payment
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"Error updating payment status: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail="Error updating payment status"
            )
    
    def verify_payment(self, invoice_id: str) -> Dict[str, Any]:
        """Verify payment with IntaSend and update local record"""
        try:
            # Get payment from database
            db_payment = self.get_payment_by_invoice_id(invoice_id)
            if not db_payment:
                raise HTTPException(
                    status_code=404,
                    detail="Payment not found"
                )
            
            # Verify with IntaSend
            intasend_data = self.intasend.verify_payment(invoice_id)
            
            # Update local payment record
            new_status = intasend_data.get("status", db_payment.status)
            
            if new_status != db_payment.status:
                self.update_payment_status(
                    invoice_id,
                    new_status,
                    {"verification_date": datetime.now().isoformat()}
                )
            
            return {
                "invoice_id": invoice_id,
                "status": new_status,
                "amount": db_payment.amount,
                "currency": db_payment.currency,
                "payment_method": db_payment.payment_method,
                "created_at": db_payment.created_at.isoformat(),
                "updated_at": db_payment.updated_at.isoformat(),
                "intasend_data": intasend_data
            }
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error verifying payment: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail="Error verifying payment"
            )
    
    def handle_webhook(self, webhook_data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle payment webhook from IntaSend"""
        try:
            # Process webhook with IntaSend service
            processed_data = self.intasend.handle_webhook(webhook_data)
            
            invoice_id = processed_data.get("invoice_id")
            status = processed_data.get("status")
            
            # Update payment in database
            if invoice_id and status:
                updated_payment = self.update_payment_status(
                    invoice_id,
                    status,
                    {
                        "webhook_received": datetime.now().isoformat(),
                        "webhook_data": webhook_data
                    }
                )
                
                if updated_payment:
                    logger.info(f"Payment {invoice_id} updated via webhook to status: {status}")
                    return {
                        "success": True,
                        "invoice_id": invoice_id,
                        "status": status,
                        "message": "Payment updated successfully"
                    }
            
            return {
                "success": False,
                "message": "Failed to process webhook"
            }
            
        except Exception as e:
            logger.error(f"Error handling webhook: {str(e)}")
            raise HTTPException(
                status_code=400,
                detail="Invalid webhook data"
            )
    
    def get_user_payments(self, customer_email: str, limit: int = 10, offset: int = 0) -> List[Payment]:
        """Get payments for a specific customer"""
        return (
            self.db.query(Payment)
            .filter(Payment.customer_email == customer_email)
            .order_by(Payment.created_at.desc())
            .offset(offset)
            .limit(limit)
            .all()
        )
    
    def get_payments_by_status(self, status: str, limit: int = 10, offset: int = 0) -> List[Payment]:
        """Get payments by status"""
        return (
            self.db.query(Payment)
            .filter(Payment.status == status)
            .order_by(Payment.created_at.desc())
            .offset(offset)
            .limit(limit)
            .all()
        )