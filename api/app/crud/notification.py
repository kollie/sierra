from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional

from .. import models, schemas

def get_notification(db: Session, notification_id: str) -> Optional[models.notification.Notification]:
    """Get a notification by ID."""
    return db.query(models.notification.Notification).filter(
        models.notification.Notification.id == notification_id
    ).first()

def get_user_notifications(
    db: Session,
    user_id: str,
    skip: int = 0,
    limit: int = 100,
    unread_only: bool = False
) -> List[models.notification.Notification]:
    """Get notifications for a specific user."""
    query = db.query(models.notification.Notification).filter(
        models.notification.Notification.user_id == user_id
    )
    
    # Filter by read status if unread_only is True
    if unread_only:
        query = query.filter(models.notification.Notification.read == False)
    
    # Order by created_at (newest first)
    query = query.order_by(models.notification.Notification.created_at.desc())
    
    # Apply pagination
    query = query.offset(skip).limit(limit)
    
    return query.all()

def create_notification(
    db: Session,
    user_id: str,
    message: str,
    notification_type: str,
    sender_id: Optional[str] = None,
    reference_id: Optional[str] = None
) -> models.notification.Notification:
    """Create a new notification."""
    # Create the notification
    db_notification = models.notification.Notification(
        user_id=user_id,
        sender_id=sender_id,
        message=message,
        notification_type=notification_type,
        reference_id=reference_id,
        read=False
    )
    
    # Add to database
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    
    return db_notification

def mark_notification_as_read(db: Session, notification_id: str, user_id: str) -> bool:
    """Mark a notification as read."""
    # Get the notification
    notification = get_notification(db, notification_id)
    
    if not notification:
        return False
    
    # Check if notification belongs to user
    if notification.user_id != user_id:
        return False
    
    # Mark as read
    notification.read = True
    db.commit()
    
    return True

def mark_all_notifications_as_read(db: Session, user_id: str) -> int:
    """Mark all of a user's notifications as read."""
    # Update all unread notifications for the user
    result = db.query(models.notification.Notification).filter(
        models.notification.Notification.user_id == user_id,
        models.notification.Notification.read == False
    ).update({"read": True})
    
    db.commit()
    
    # Return the number of notifications updated
    return result

def delete_notification(db: Session, notification_id: str, user_id: str) -> bool:
    """Delete a notification."""
    # Get the notification
    notification = get_notification(db, notification_id)
    
    if not notification:
        return False
    
    # Check if notification belongs to user
    if notification.user_id != user_id:
        return False
    
    # Delete the notification
    db.delete(notification)
    db.commit()
    
    return True 