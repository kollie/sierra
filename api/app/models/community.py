from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
import uuid

from ..database import Base
from .user import user_community

class Community(Base):
    """Community model representing user communities."""
    
    __tablename__ = "communities"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image = Column(String, nullable=True)
    category = Column(String, nullable=False)
    location = Column(String, nullable=True)
    guidelines = Column(String, nullable=True)
    creator_id = Column(String, ForeignKey("users.id"), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    
    # Relationships
    # Community creator
    creator = relationship("User", foreign_keys=[creator_id])
    
    # Members (users) of the community
    members = relationship(
        "User",
        secondary=user_community,
        back_populates="communities"
    )
    
    # Events associated with the community
    events = relationship("Event", back_populates="community") 