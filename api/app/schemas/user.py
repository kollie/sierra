from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

# Base User schema shared properties
class UserBase(BaseModel):
    email: EmailStr
    name: str
    
# Schema for user creation (registration)
class UserCreate(UserBase):
    password: str
    location: Optional[str] = None
    interests: Optional[List[str]] = None
    notifications_enabled: bool = True
    location_sharing_enabled: bool = True

# Schema for updating user profile
class UserUpdate(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    interests: Optional[List[str]] = None
    notifications_enabled: Optional[bool] = None
    location_sharing_enabled: Optional[bool] = None

# Schema for showing a user (response model)
class User(UserBase):
    id: str
    avatar: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    interests: Optional[List[str]] = None
    eventsAttended: int = 0
    communities: int = 0
    created_at: datetime
    
    class Config:
        orm_mode = True
        
# Schema for showing minimal user info (for event organizers, etc.)
class UserInfo(BaseModel):
    id: str
    name: str
    avatar: Optional[str] = None
    
    class Config:
        orm_mode = True 