from sqlalchemy.orm import Session
from typing import List, Optional

from .. import models, schemas
from ..utils.security import get_password_hash

def get_user(db: Session, user_id: str) -> Optional[models.user.User]:
    """Get a user by ID."""
    return db.query(models.user.User).filter(models.user.User.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> Optional[models.user.User]:
    """Get a user by email."""
    return db.query(models.user.User).filter(models.user.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[models.user.User]:
    """Get multiple users with pagination."""
    return db.query(models.user.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.user.UserCreate) -> models.user.User:
    """Create a new user."""
    # Hash the password
    hashed_password = get_password_hash(user.password)
    
    # Convert interests list to comma-separated string if provided
    interests_str = None
    if user.interests:
        interests_str = ",".join(user.interests)
    
    # Create the user
    db_user = models.user.User(
        email=user.email,
        password=hashed_password,
        name=user.name,
        location=user.location,
        interests=interests_str,
        notifications_enabled=user.notifications_enabled,
        location_sharing_enabled=user.location_sharing_enabled
    )
    
    # Add to database
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

def update_user(db: Session, user_id: str, user_data: schemas.user.UserUpdate) -> Optional[models.user.User]:
    """Update a user's profile."""
    # Get the user
    db_user = get_user(db, user_id)
    if not db_user:
        return None
        
    # Convert interests list to comma-separated string if provided
    if user_data.interests is not None:
        interests_str = ",".join(user_data.interests)
        user_data_dict = user_data.dict(exclude={"interests"})
        user_data_dict["interests"] = interests_str
    else:
        user_data_dict = user_data.dict(exclude_unset=True)
    
    # Update user attributes
    for key, value in user_data_dict.items():
        if value is not None:
            setattr(db_user, key, value)
    
    # Commit changes
    db.commit()
    db.refresh(db_user)
    
    return db_user

def delete_user(db: Session, user_id: str) -> bool:
    """Delete a user."""
    # Get the user
    db_user = get_user(db, user_id)
    if not db_user:
        return False
        
    # Delete the user
    db.delete(db_user)
    db.commit()
    
    return True 