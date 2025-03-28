from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from .. import models, schemas
from ..database import get_db
from ..utils.security import get_current_user
from ..crud import notification as notification_crud

router = APIRouter()

@router.get("/", response_model=List[schemas.notification.Notification])
async def get_notifications(
    skip: int = 0,
    limit: int = 100,
    unread_only: bool = False,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Get notifications for the current user.
    """
    # Get notifications from database
    notifications = notification_crud.get_user_notifications(
        db=db,
        user_id=current_user.id,
        skip=skip,
        limit=limit,
        unread_only=unread_only
    )
    
    # Format response
    notification_responses = []
    for notification in notifications:
        # Format time
        formatted_time = notification.created_at.strftime("%Y-%m-%d %H:%M:%S")
        
        # Get sender info if applicable
        sender_name = None
        sender_avatar = None
        if notification.sender_id:
            sender_name = notification.sender.name
            sender_avatar = notification.sender.avatar
        
        # Format notification for response
        notification_response = schemas.notification.Notification(
            id=notification.id,
            message=notification.message,
            sender=sender_name,
            avatar=sender_avatar,
            time=formatted_time,
            read=notification.read,
            notification_type=notification.notification_type,
            reference_id=notification.reference_id
        )
        
        notification_responses.append(notification_response)
    
    return notification_responses

@router.post("/read", status_code=status.HTTP_200_OK)
async def mark_notification_as_read(
    notification_data: schemas.notification.NotificationRead,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Mark a notification as read.
    """
    # Mark notification as read
    success = notification_crud.mark_notification_as_read(
        db=db,
        notification_id=notification_data.notification_id,
        user_id=current_user.id
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found or does not belong to you"
        )
    
    return {"message": "Notification marked as read"}

@router.post("/read-all", status_code=status.HTTP_200_OK)
async def mark_all_notifications_as_read(
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Mark all notifications as read.
    """
    # Mark all notifications as read
    count = notification_crud.mark_all_notifications_as_read(
        db=db,
        user_id=current_user.id
    )
    
    return {"message": f"Marked {count} notifications as read"}

@router.delete("/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_notification(
    notification_id: str,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Delete a notification.
    """
    # Delete notification
    success = notification_crud.delete_notification(
        db=db,
        notification_id=notification_id,
        user_id=current_user.id
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found or does not belong to you"
        )
    
    return 