from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from ..db.database import get_db
from ..models.users import User, Applicant, Course, University, Subscriber
from ..schemas.user import ApplicantCreate, ApplicantResponse
from ..schemas.subscriber import SubscriberCreate, SubscriberResponse
from ..utils.password import generate_secure_password
from passlib.hash import bcrypt

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
