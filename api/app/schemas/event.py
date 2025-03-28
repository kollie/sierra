from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

from .user import UserInfo

# Base Event schema shared properties
class EventBase(BaseModel):
    title: str
    description: str
    date: str
    time: str
    location: str
    category: str
    
# Schema for event creation
class EventCreate(EventBase):
    price: float = 0
    image: Optional[str] = None
    community_id: Optional[str] = None

# Schema for updating an event
class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    community_id: Optional[str] = None

# Schema for event response
class Event(EventBase):
    id: str
    image: Optional[str] = None
    price: float
    attendees: int
    attendeeAvatars: List[str] = []
    organizer: UserInfo
    created_at: datetime
    
    class Config:
        orm_mode = True

# Schema for attendance operations
class EventAttendance(BaseModel):
    event_id: str

# Schema for liking/favoriting events
class EventLike(BaseModel):
    event_id: str 