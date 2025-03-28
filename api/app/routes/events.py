from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional

from .. import models, schemas
from ..database import get_db
from ..utils.security import get_current_user
from ..crud import event as event_crud

router = APIRouter()

@router.get("/", response_model=List[schemas.event.Event])
async def get_events(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    location: Optional[str] = None,
    price_filter: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Get all events with optional filtering.
    """
    # Get events from database
    events = event_crud.get_events(
        db=db,
        skip=skip,
        limit=limit,
        category=category,
        location=location,
        price_filter=price_filter
    )
    
    # Format response
    event_responses = []
    for event in events:
        # Get attendee avatars (limit to first 5)
        attendee_avatars = [
            attendee.avatar for attendee in event.attendees[:5]
            if attendee.avatar is not None
        ]
        
        # Format event for response
        event_response = schemas.event.Event(
            id=event.id,
            title=event.title,
            description=event.description,
            date=event.date,
            time=event.time,
            location=event.location,
            category=event.category,
            price=event.price,
            image=event.image,
            attendees=len(event.attendees),
            attendeeAvatars=attendee_avatars,
            organizer=schemas.user.UserInfo(
                id=event.organizer.id,
                name=event.organizer.name,
                avatar=event.organizer.avatar
            ),
            created_at=event.created_at
        )
        
        event_responses.append(event_response)
    
    return event_responses

@router.post("/", response_model=schemas.event.Event, status_code=status.HTTP_201_CREATED)
async def create_event(
    event_data: schemas.event.EventCreate,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Create a new event.
    """
    # Create event
    event = event_crud.create_event(db=db, event=event_data, user_id=current_user.id)
    
    # Format response
    event_response = schemas.event.Event(
        id=event.id,
        title=event.title,
        description=event.description,
        date=event.date,
        time=event.time,
        location=event.location,
        category=event.category,
        price=event.price,
        image=event.image,
        attendees=len(event.attendees),
        attendeeAvatars=[],
        organizer=schemas.user.UserInfo(
            id=event.organizer.id,
            name=event.organizer.name,
            avatar=event.organizer.avatar
        ),
        created_at=event.created_at
    )
    
    return event_response

@router.get("/user/{user_id}", response_model=List[schemas.event.Event])
async def get_user_events(
    user_id: str,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Get events created by a specific user.
    """
    # Get events from database
    events = event_crud.get_events_by_user(db=db, user_id=user_id, skip=skip, limit=limit)
    
    # Format response
    event_responses = []
    for event in events:
        # Get attendee avatars (limit to first 5)
        attendee_avatars = [
            attendee.avatar for attendee in event.attendees[:5]
            if attendee.avatar is not None
        ]
        
        # Format event for response
        event_response = schemas.event.Event(
            id=event.id,
            title=event.title,
            description=event.description,
            date=event.date,
            time=event.time,
            location=event.location,
            category=event.category,
            price=event.price,
            image=event.image,
            attendees=len(event.attendees),
            attendeeAvatars=attendee_avatars,
            organizer=schemas.user.UserInfo(
                id=event.organizer.id,
                name=event.organizer.name,
                avatar=event.organizer.avatar
            ),
            created_at=event.created_at
        )
        
        event_responses.append(event_response)
    
    return event_responses

@router.get("/attending", response_model=List[schemas.event.Event])
async def get_attending_events(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Get events that the current user is attending.
    """
    # Get events from database
    events = event_crud.get_attended_events(db=db, user_id=current_user.id, skip=skip, limit=limit)
    
    # Format response
    event_responses = []
    for event in events:
        # Get attendee avatars (limit to first 5)
        attendee_avatars = [
            attendee.avatar for attendee in event.attendees[:5]
            if attendee.avatar is not None
        ]
        
        # Format event for response
        event_response = schemas.event.Event(
            id=event.id,
            title=event.title,
            description=event.description,
            date=event.date,
            time=event.time,
            location=event.location,
            category=event.category,
            price=event.price,
            image=event.image,
            attendees=len(event.attendees),
            attendeeAvatars=attendee_avatars,
            organizer=schemas.user.UserInfo(
                id=event.organizer.id,
                name=event.organizer.name,
                avatar=event.organizer.avatar
            ),
            created_at=event.created_at
        )
        
        event_responses.append(event_response)
    
    return event_responses

@router.get("/favorites", response_model=List[schemas.event.Event])
async def get_liked_events(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Get events that the current user has liked/favorited.
    """
    # Get events from database
    events = event_crud.get_liked_events(db=db, user_id=current_user.id, skip=skip, limit=limit)
    
    # Format response
    event_responses = []
    for event in events:
        # Get attendee avatars (limit to first 5)
        attendee_avatars = [
            attendee.avatar for attendee in event.attendees[:5]
            if attendee.avatar is not None
        ]
        
        # Format event for response
        event_response = schemas.event.Event(
            id=event.id,
            title=event.title,
            description=event.description,
            date=event.date,
            time=event.time,
            location=event.location,
            category=event.category,
            price=event.price,
            image=event.image,
            attendees=len(event.attendees),
            attendeeAvatars=attendee_avatars,
            organizer=schemas.user.UserInfo(
                id=event.organizer.id,
                name=event.organizer.name,
                avatar=event.organizer.avatar
            ),
            created_at=event.created_at
        )
        
        event_responses.append(event_response)
    
    return event_responses

@router.get("/{event_id}", response_model=schemas.event.Event)
async def get_event(
    event_id: str,
    db: Session = Depends(get_db)
):
    """
    Get a specific event by ID.
    """
    # Get event from database
    event = event_crud.get_event(db=db, event_id=event_id)
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    # Get attendee avatars (limit to first 5)
    attendee_avatars = [
        attendee.avatar for attendee in event.attendees[:5]
        if attendee.avatar is not None
    ]
    
    # Format response
    event_response = schemas.event.Event(
        id=event.id,
        title=event.title,
        description=event.description,
        date=event.date,
        time=event.time,
        location=event.location,
        category=event.category,
        price=event.price,
        image=event.image,
        attendees=len(event.attendees),
        attendeeAvatars=attendee_avatars,
        organizer=schemas.user.UserInfo(
            id=event.organizer.id,
            name=event.organizer.name,
            avatar=event.organizer.avatar
        ),
        created_at=event.created_at
    )
    
    return event_response

@router.put("/{event_id}", response_model=schemas.event.Event)
async def update_event(
    event_id: str,
    event_data: schemas.event.EventUpdate,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Update a specific event.
    """
    # Update event
    updated_event = event_crud.update_event(
        db=db,
        event_id=event_id,
        event_data=event_data,
        user_id=current_user.id
    )
    
    if not updated_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have permission to update it"
        )
    
    # Get attendee avatars (limit to first 5)
    attendee_avatars = [
        attendee.avatar for attendee in updated_event.attendees[:5]
        if attendee.avatar is not None
    ]
    
    # Format response
    event_response = schemas.event.Event(
        id=updated_event.id,
        title=updated_event.title,
        description=updated_event.description,
        date=updated_event.date,
        time=updated_event.time,
        location=updated_event.location,
        category=updated_event.category,
        price=updated_event.price,
        image=updated_event.image,
        attendees=len(updated_event.attendees),
        attendeeAvatars=attendee_avatars,
        organizer=schemas.user.UserInfo(
            id=updated_event.organizer.id,
            name=updated_event.organizer.name,
            avatar=updated_event.organizer.avatar
        ),
        created_at=updated_event.created_at
    )
    
    return event_response

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(
    event_id: str,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Delete a specific event.
    """
    # Delete event
    success = event_crud.delete_event(db=db, event_id=event_id, user_id=current_user.id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found or you don't have permission to delete it"
        )
    
    return

@router.post("/attend", status_code=status.HTTP_200_OK)
async def attend_event(
    event_attendance: schemas.event.EventAttendance,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Attend an event.
    """
    # Attend event
    success = event_crud.attend_event(
        db=db,
        event_id=event_attendance.event_id,
        user_id=current_user.id
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    return {"message": "Successfully attending event"}

@router.post("/unattend", status_code=status.HTTP_200_OK)
async def unattend_event(
    event_attendance: schemas.event.EventAttendance,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Unattend an event.
    """
    # Unattend event
    success = event_crud.unattend_event(
        db=db,
        event_id=event_attendance.event_id,
        user_id=current_user.id
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    return {"message": "Successfully unattended event"}

@router.post("/like", status_code=status.HTTP_200_OK)
async def like_event(
    event_like: schemas.event.EventLike,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Like/favorite an event.
    """
    # Like event
    success = event_crud.like_event(
        db=db,
        event_id=event_like.event_id,
        user_id=current_user.id
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    return {"message": "Successfully liked event"}

@router.post("/unlike", status_code=status.HTTP_200_OK)
async def unlike_event(
    event_like: schemas.event.EventLike,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Unlike/unfavorite an event.
    """
    # Unlike event
    success = event_crud.unlike_event(
        db=db,
        event_id=event_like.event_id,
        user_id=current_user.id
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    return {"message": "Successfully unliked event"} 