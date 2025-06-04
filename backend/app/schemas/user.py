from datetime import date

from pydantic import BaseModel


class ApplicantCreate(BaseModel):
    first_name: str
    last_name: str
    email_phone: str
    dob: date
    course_id: int
    university_name: str
    essay: str | None = None


class ApplicantResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email_phone: str
    dob: date
    course_id: int
    university_id: int
    essay: str | None
    user_id: int

    class Config:
        from_attributes = True
