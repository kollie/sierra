from sqlalchemy import Boolean, Column, String, Integer, Table, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
import uuid

from ..database import Base

# Association table for user-community relationships (many-to-many)
user_community = Table(
    "user_community",
    Base.metadata,
    Column("user_id", String, ForeignKey("users.id"), primary_key=True),
    Column("community_id", String, ForeignKey("communities.id"), primary_key=True),
)

# Association table for event attendance (many-to-many)
user_event = Table(
    "user_event",
    Base.metadata,
    Column("user_id", String, ForeignKey("users.id"), primary_key=True),
    Column("event_id", String, ForeignKey("events.id"), primary_key=True),
)

# Association table for event likes (many-to-many)
user_liked_event = Table(
    "user_liked_event",
    Base.metadata,
    Column("user_id", String, ForeignKey("users.id"), primary_key=True),
    Column("event_id", String, ForeignKey("events.id"), primary_key=True),
)

class User(Base):
    """User model representing application users."""
    
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    avatar = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    location = Column(String, nullable=True)
    interests = Column(String, nullable=True)  # Comma-separated list of interests
    notifications_enabled = Column(Boolean, default=True)
    location_sharing_enabled = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    
    # Relationships
    # Events created by the user
    created_events = relationship("Event", back_populates="organizer")
    
    # Communities the user is a member of
    communities = relationship(
        "Community",
        secondary=user_community,
        back_populates="members"
    )
    
    # Events the user is attending
    attending_events = relationship(
        "Event",
        secondary=user_event,
        back_populates="attendees"
    )
    
    # Events the user has liked/favorited
    liked_events = relationship(
        "Event",
        secondary=user_liked_event,
        back_populates="likers"
    )
    
    # Notifications received by the user
    notifications = relationship("Notification", back_populates="user")