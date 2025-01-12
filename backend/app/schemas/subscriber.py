from pydantic import BaseModel, EmailStr
from datetime import datetime


class SubscriberCreate(BaseModel):
    email: EmailStr


class SubscriberResponse(BaseModel):
    id: int
    email: EmailStr
    subscribed_at: datetime

    class Config:
        orm_mode = True
