from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional

from .. import models, schemas
from ..database import get_db
from ..utils.security import get_current_user
from ..crud import community as community_crud

router = APIRouter()

@router.get("/", response_model=List[schemas.community.Community])
async def get_communities(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    membership_filter: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Get all communities with optional filtering.
    """
    # Get communities from database
    communities = community_crud.get_communities(
        db=db,
        skip=skip,
        limit=limit,
        category=category,
        membership_filter=membership_filter,
        user_id=current_user.id
    )
    
    # Format response
    community_responses = []
    for community in communities:
        # Check if user has joined this community
        joined = current_user in community.members
        
        # Format community for response
        community_response = schemas.community.Community(
            id=community.id,
            name=community.name,
            description=community.description,
            category=community.category,
            location=community.location,
            image=community.image,
            guidelines=community.guidelines,
            members=len(community.members),
            joined=joined,
            creator=schemas.user.UserInfo(
                id=community.creator.id,
                name=community.creator.name,
                avatar=community.creator.avatar
            ),
            created_at=community.created_at
        )
        
        community_responses.append(community_response)
    
    return community_responses

@router.post("/", response_model=schemas.community.Community, status_code=status.HTTP_201_CREATED)
async def create_community(
    community_data: schemas.community.CommunityCreate,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Create a new community.
    """
    # Create community
    community = community_crud.create_community(db=db, community=community_data, user_id=current_user.id)
    
    # Format response
    community_response = schemas.community.Community(
        id=community.id,
        name=community.name,
        description=community.description,
        category=community.category,
        location=community.location,
        image=community.image,
        guidelines=community.guidelines,
        members=len(community.members),
        joined=True,  # Creator is automatically a member
        creator=schemas.user.UserInfo(
            id=community.creator.id,
            name=community.creator.name,
            avatar=community.creator.avatar
        ),
        created_at=community.created_at
    )
    
    return community_response

@router.get("/user/{user_id}", response_model=List[schemas.community.Community])
async def get_user_communities(
    user_id: str,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Get communities created by a specific user.
    """
    # Get communities from database
    communities = community_crud.get_communities_by_user(db=db, user_id=user_id, skip=skip, limit=limit)
    
    # Format response
    community_responses = []
    for community in communities:
        # Check if current user has joined this community
        joined = current_user in community.members
        
        # Format community for response
        community_response = schemas.community.Community(
            id=community.id,
            name=community.name,
            description=community.description,
            category=community.category,
            location=community.location,
            image=community.image,
            guidelines=community.guidelines,
            members=len(community.members),
            joined=joined,
            creator=schemas.user.UserInfo(
                id=community.creator.id,
                name=community.creator.name,
                avatar=community.creator.avatar
            ),
            created_at=community.created_at
        )
        
        community_responses.append(community_response)
    
    return community_responses

@router.get("/joined", response_model=List[schemas.community.Community])
async def get_joined_communities(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Get communities that the current user is a member of.
    """
    # Get communities from database
    communities = community_crud.get_joined_communities(db=db, user_id=current_user.id, skip=skip, limit=limit)
    
    # Format response
    community_responses = []
    for community in communities:
        # Format community for response
        community_response = schemas.community.Community(
            id=community.id,
            name=community.name,
            description=community.description,
            category=community.category,
            location=community.location,
            image=community.image,
            guidelines=community.guidelines,
            members=len(community.members),
            joined=True,  # User is definitely a member
            creator=schemas.user.UserInfo(
                id=community.creator.id,
                name=community.creator.name,
                avatar=community.creator.avatar
            ),
            created_at=community.created_at
        )
        
        community_responses.append(community_response)
    
    return community_responses

@router.get("/{community_id}", response_model=schemas.community.Community)
async def get_community(
    community_id: str,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Get a specific community by ID.
    """
    # Get community from database
    community = community_crud.get_community(db=db, community_id=community_id)
    
    if not community:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Community not found"
        )
    
    # Check if user has joined this community
    joined = current_user in community.members
    
    # Format response
    community_response = schemas.community.Community(
        id=community.id,
        name=community.name,
        description=community.description,
        category=community.category,
        location=community.location,
        image=community.image,
        guidelines=community.guidelines,
        members=len(community.members),
        joined=joined,
        creator=schemas.user.UserInfo(
            id=community.creator.id,
            name=community.creator.name,
            avatar=community.creator.avatar
        ),
        created_at=community.created_at
    )
    
    return community_response

@router.put("/{community_id}", response_model=schemas.community.Community)
async def update_community(
    community_id: str,
    community_data: schemas.community.CommunityUpdate,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Update a specific community.
    """
    # Update community
    updated_community = community_crud.update_community(
        db=db,
        community_id=community_id,
        community_data=community_data,
        user_id=current_user.id
    )
    
    if not updated_community:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Community not found or you don't have permission to update it"
        )
    
    # Check if user has joined this community
    joined = current_user in updated_community.members
    
    # Format response
    community_response = schemas.community.Community(
        id=updated_community.id,
        name=updated_community.name,
        description=updated_community.description,
        category=updated_community.category,
        location=updated_community.location,
        image=updated_community.image,
        guidelines=updated_community.guidelines,
        members=len(updated_community.members),
        joined=joined,
        creator=schemas.user.UserInfo(
            id=updated_community.creator.id,
            name=updated_community.creator.name,
            avatar=updated_community.creator.avatar
        ),
        created_at=updated_community.created_at
    )
    
    return community_response

@router.delete("/{community_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_community(
    community_id: str,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Delete a specific community.
    """
    # Delete community
    success = community_crud.delete_community(db=db, community_id=community_id, user_id=current_user.id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Community not found or you don't have permission to delete it"
        )
    
    return

@router.post("/join", status_code=status.HTTP_200_OK)
async def join_community(
    community_membership: schemas.community.CommunityMembership,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Join a community.
    """
    # Join community
    success = community_crud.join_community(
        db=db,
        community_id=community_membership.community_id,
        user_id=current_user.id
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Community not found"
        )
    
    return {"message": "Successfully joined community"}

@router.post("/leave", status_code=status.HTTP_200_OK)
async def leave_community(
    community_membership: schemas.community.CommunityMembership,
    db: Session = Depends(get_db),
    current_user: models.user.User = Depends(get_current_user)
):
    """
    Leave a community.
    """
    # Leave community
    success = community_crud.leave_community(
        db=db,
        community_id=community_membership.community_id,
        user_id=current_user.id
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to leave community. You may be the creator or the community doesn't exist."
        )
    
    return {"message": "Successfully left community"} 