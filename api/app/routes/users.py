from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas
from ..database import get_db
from ..utils.security import get_current_user
from ..crud import user as user_crud

router = APIRouter()

@router.get("/me", response_model=schemas.user.User)
async def get_current_user_profile(current_user: models.user.User = Depends(get_current_user)):
    """
    Get the current user's profile.
    """
    user = current_user
    
    # Calculate events attended
    events_attended = len(user.attending_events)
    
    # Calculate communities joined
    communities_joined = len(user.communities)
    
    # Convert comma-separated interests to list if present
    interests_list = []
    if user.interests:
        interests_list = user.interests.split(",")
    
    # Create response
    user_response = schemas.user.User(
        id=user.id,
        email=user.email,
        name=user.name,
        avatar=user.avatar,
        bio=user.bio,
        location=user.location,
        interests=interests_list,
        eventsAttended=events_attended,
        communities=communities_joined,
        created_at=user.created_at
    )
    
    return user_response

@router.put("/me", response_model=schemas.user.User)
async def update_user_profile(
    user_data: schemas.user.UserUpdate,
    current_user: models.user.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update the current user's profile.
    """
    updated_user = user_crud.update_user(db, current_user.id, user_data)
    
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Calculate events attended
    events_attended = len(updated_user.attending_events)
    
    # Calculate communities joined
    communities_joined = len(updated_user.communities)
    
    # Convert comma-separated interests to list if present
    interests_list = []
    if updated_user.interests:
        interests_list = updated_user.interests.split(",")
    
    # Create response
    user_response = schemas.user.User(
        id=updated_user.id,
        email=updated_user.email,
        name=updated_user.name,
        avatar=updated_user.avatar,
        bio=updated_user.bio,
        location=updated_user.location,
        interests=interests_list,
        eventsAttended=events_attended,
        communities=communities_joined,
        created_at=updated_user.created_at
    )
    
    return user_response

@router.get("/{user_id}", response_model=schemas.user.User)
async def get_user_profile(
    user_id: str,
    db: Session = Depends(get_db)
):
    """
    Get a user's profile by ID.
    """
    user = user_crud.get_user(db, user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Calculate events attended
    events_attended = len(user.attending_events)
    
    # Calculate communities joined
    communities_joined = len(user.communities)
    
    # Convert comma-separated interests to list if present
    interests_list = []
    if user.interests:
        interests_list = user.interests.split(",")
    
    # Create response
    user_response = schemas.user.User(
        id=user.id,
        email=user.email,
        name=user.name,
        avatar=user.avatar,
        bio=user.bio,
        location=user.location,
        interests=interests_list,
        eventsAttended=events_attended,
        communities=communities_joined,
        created_at=user.created_at
    )
    
    return user_response 