from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Schema for notification response
class Notification(BaseModel):
    id: str
    message: str
    sender: Optional[str] = None  # Sender name
    avatar: Optional[str] = None  # Sender avatar
    time: str  # Formatted timestamp
    read: bool
    notification_type: str
    reference_id: Optional[str] = None
    
    class Config:
        orm_mode = True

# Schema for marking notifications as read
class NotificationRead(BaseModel):
    notification_id: str 