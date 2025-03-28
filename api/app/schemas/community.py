from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from .user import UserInfo

# Base Community schema shared properties
class CommunityBase(BaseModel):
    name: str
    description: str
    category: str
    
# Schema for community creation
class CommunityCreate(CommunityBase):
    location: Optional[str] = None
    image: Optional[str] = None
    guidelines: Optional[str] = None

# Schema for updating a community
class CommunityUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    image: Optional[str] = None
    guidelines: Optional[str] = None

# Schema for community response
class Community(CommunityBase):
    id: str
    image: Optional[str] = None
    location: Optional[str] = None
    guidelines: Optional[str] = None
    members: int = 0
    creator: UserInfo
    joined: bool = False  # Whether the requesting user has joined this community
    created_at: datetime
    
    class Config:
        orm_mode = True

# Schema for joining/leaving communities
class CommunityMembership(BaseModel):
    community_id: str 