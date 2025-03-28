from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
import uuid

from ..database import Base

class Notification(Base):
    """Notification model representing user notifications."""
    
    __tablename__ = "notifications"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    sender_id = Column(String, ForeignKey("users.id"), nullable=True)
    message = Column(String, nullable=False)
    notification_type = Column(String, nullable=False)  # e.g., "event", "community", "system"
    reference_id = Column(String, nullable=True)  # ID of related entity (event, community, etc.)
    read = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    
    # Relationships
    # User receiving the notification
    user = relationship("User", foreign_keys=[user_id], back_populates="notifications")
    
    # User sending the notification (if applicable)
    sender = relationship("User", foreign_keys=[sender_id]) 