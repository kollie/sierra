from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
import uuid

from ..database import Base
from .user import user_event, user_liked_event

class Event(Base):
    """Event model representing community events."""
    
    __tablename__ = "events"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image = Column(String, nullable=True)
    date = Column(String, nullable=False)  # ISO format date
    time = Column(String, nullable=False)  # ISO format time
    location = Column(String, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, default=0.0)
    organizer_id = Column(String, ForeignKey("users.id"), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    
    # Relationships
    # Event organizer (creator)
    organizer = relationship("User", back_populates="created_events")
    
    # Community the event belongs to (if any)
    community_id = Column(String, ForeignKey("communities.id"), nullable=True)
    community = relationship("Community", back_populates="events")
    
    # Users attending the event
    attendees = relationship(
        "User",
        secondary=user_event,
        back_populates="attending_events"
    )
    
    # Users who liked/favorited the event
    likers = relationship(
        "User",
        secondary=user_liked_event,
        back_populates="liked_events"
    ) 