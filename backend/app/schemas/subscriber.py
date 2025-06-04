from datetime import datetime

from pydantic import BaseModel, EmailStr


class SubscriberCreate(BaseModel):
    email: EmailStr


class SubscriberResponse(BaseModel):
    id: int
    email: EmailStr
    subscribed_at: datetime

    class Config:
        from_attributes = True
