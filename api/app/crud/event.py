from sqlalchemy.orm import Session
from typing import List, Optional

from .. import models, schemas

def get_event(db: Session, event_id: str) -> Optional[models.event.Event]:
    """Get an event by ID."""
    return db.query(models.event.Event).filter(models.event.Event.id == event_id).first()

def get_events(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    location: Optional[str] = None,
    price_filter: Optional[str] = None,
) -> List[models.event.Event]:
    """Get multiple events with filters and pagination."""
    query = db.query(models.event.Event)
    
    # Apply filters if provided
    if category and category != "all":
        query = query.filter(models.event.Event.category == category)
        
    if location:
        query = query.filter(models.event.Event.location.contains(location))
        
    if price_filter:
        if price_filter == "free":
            query = query.filter(models.event.Event.price == 0)
        elif price_filter == "paid":
            query = query.filter(models.event.Event.price > 0)
    
    # Order by date (newest first)
    query = query.order_by(models.event.Event.date.desc())
    
    # Apply pagination
    query = query.offset(skip).limit(limit)
    
    return query.all()

def get_events_by_user(db: Session, user_id: str, skip: int = 0, limit: int = 100) -> List[models.event.Event]:
    """Get events created by a specific user."""
    return db.query(models.event.Event).filter(
        models.event.Event.organizer_id == user_id
    ).offset(skip).limit(limit).all()

def get_attended_events(db: Session, user_id: str, skip: int = 0, limit: int = 100) -> List[models.event.Event]:
    """Get events that a user is attending."""
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    if not user:
        return []
        
    # Get attended events
    return user.attending_events[skip:skip+limit]

def get_liked_events(db: Session, user_id: str, skip: int = 0, limit: int = 100) -> List[models.event.Event]:
    """Get events that a user has liked/favorited."""
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    if not user:
        return []
        
    # Get liked events
    return user.liked_events[skip:skip+limit]

def create_event(db: Session, event: schemas.event.EventCreate, user_id: str) -> models.event.Event:
    """Create a new event."""
    # Create the event
    db_event = models.event.Event(
        title=event.title,
        description=event.description,
        date=event.date,
        time=event.time,
        location=event.location,
        category=event.category,
        price=event.price,
        image=event.image,
        community_id=event.community_id,
        organizer_id=user_id
    )
    
    # Add to database
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    
    return db_event

def update_event(
    db: Session,
    event_id: str,
    event_data: schemas.event.EventUpdate,
    user_id: str
) -> Optional[models.event.Event]:
    """Update an event."""
    # Get the event
    db_event = get_event(db, event_id)
    if not db_event:
        return None
        
    # Check if user is the organizer
    if db_event.organizer_id != user_id:
        return None
        
    # Update event attributes
    update_data = event_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_event, key, value)
    
    # Commit changes
    db.commit()
    db.refresh(db_event)
    
    return db_event

def delete_event(db: Session, event_id: str, user_id: str) -> bool:
    """Delete an event."""
    # Get the event
    db_event = get_event(db, event_id)
    if not db_event:
        return False
        
    # Check if user is the organizer
    if db_event.organizer_id != user_id:
        return False
        
    # Delete the event
    db.delete(db_event)
    db.commit()
    
    return True

def attend_event(db: Session, event_id: str, user_id: str) -> bool:
    """Add a user as an attendee to an event."""
    # Get the event and user
    event = get_event(db, event_id)
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    
    if not event or not user:
        return False
    
    # Check if user is already attending
    if user in event.attendees:
        return True
    
    # Add user to attendees
    event.attendees.append(user)
    db.commit()
    
    return True

def unattend_event(db: Session, event_id: str, user_id: str) -> bool:
    """Remove a user as an attendee from an event."""
    # Get the event and user
    event = get_event(db, event_id)
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    
    if not event or not user:
        return False
    
    # Check if user is attending
    if user not in event.attendees:
        return True
    
    # Remove user from attendees
    event.attendees.remove(user)
    db.commit()
    
    return True

def like_event(db: Session, event_id: str, user_id: str) -> bool:
    """Add a user as a liker to an event."""
    # Get the event and user
    event = get_event(db, event_id)
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    
    if not event or not user:
        return False
    
    # Check if user already likes the event
    if user in event.likers:
        return True
    
    # Add user to likers
    event.likers.append(user)
    db.commit()
    
    return True

def unlike_event(db: Session, event_id: str, user_id: str) -> bool:
    """Remove a user as a liker from an event."""
    # Get the event and user
    event = get_event(db, event_id)
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    
    if not event or not user:
        return False
    
    # Check if user likes the event
    if user not in event.likers:
        return True
    
    # Remove user from likers
    event.likers.remove(user)
    db.commit()
    
    return True 