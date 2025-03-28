from sqlalchemy.orm import Session
from typing import List, Optional

from .. import models, schemas

def get_community(db: Session, community_id: str) -> Optional[models.community.Community]:
    """Get a community by ID."""
    return db.query(models.community.Community).filter(models.community.Community.id == community_id).first()

def get_communities(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    membership_filter: Optional[str] = None,
    user_id: Optional[str] = None
) -> List[models.community.Community]:
    """Get multiple communities with filters and pagination."""
    query = db.query(models.community.Community)
    
    # Apply category filter if provided
    if category and category != "all":
        query = query.filter(models.community.Community.category == category)
    
    # Apply membership filter if both membership filter and user ID are provided
    if membership_filter and user_id and membership_filter != "all":
        # Get the user
        user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
        
        if user:
            # Get communities where user is a member
            user_communities = user.communities
            
            if membership_filter == "joined":
                # Only include communities the user has joined
                query = query.filter(models.community.Community.id.in_([comm.id for comm in user_communities]))
            elif membership_filter == "notJoined":
                # Exclude communities the user has joined
                query = query.filter(~models.community.Community.id.in_([comm.id for comm in user_communities]))
    
    # Order by created date (newest first)
    query = query.order_by(models.community.Community.created_at.desc())
    
    # Apply pagination
    query = query.offset(skip).limit(limit)
    
    return query.all()

def get_communities_by_user(db: Session, user_id: str, skip: int = 0, limit: int = 100) -> List[models.community.Community]:
    """Get communities created by a specific user."""
    return db.query(models.community.Community).filter(
        models.community.Community.creator_id == user_id
    ).offset(skip).limit(limit).all()

def get_joined_communities(db: Session, user_id: str, skip: int = 0, limit: int = 100) -> List[models.community.Community]:
    """Get communities that a user is a member of."""
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    if not user:
        return []
        
    # Get joined communities
    return user.communities[skip:skip+limit]

def create_community(db: Session, community: schemas.community.CommunityCreate, user_id: str) -> models.community.Community:
    """Create a new community."""
    # Create the community
    db_community = models.community.Community(
        name=community.name,
        description=community.description,
        category=community.category,
        location=community.location,
        image=community.image,
        guidelines=community.guidelines,
        creator_id=user_id
    )
    
    # Add to database
    db.add(db_community)
    db.commit()
    db.refresh(db_community)
    
    # Add creator as a member
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    db_community.members.append(user)
    db.commit()
    
    return db_community

def update_community(
    db: Session,
    community_id: str,
    community_data: schemas.community.CommunityUpdate,
    user_id: str
) -> Optional[models.community.Community]:
    """Update a community."""
    # Get the community
    db_community = get_community(db, community_id)
    if not db_community:
        return None
        
    # Check if user is the creator
    if db_community.creator_id != user_id:
        return None
        
    # Update community attributes
    update_data = community_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_community, key, value)
    
    # Commit changes
    db.commit()
    db.refresh(db_community)
    
    return db_community

def delete_community(db: Session, community_id: str, user_id: str) -> bool:
    """Delete a community."""
    # Get the community
    db_community = get_community(db, community_id)
    if not db_community:
        return False
        
    # Check if user is the creator
    if db_community.creator_id != user_id:
        return False
        
    # Delete the community
    db.delete(db_community)
    db.commit()
    
    return True

def join_community(db: Session, community_id: str, user_id: str) -> bool:
    """Add a user as a member to a community."""
    # Get the community and user
    community = get_community(db, community_id)
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    
    if not community or not user:
        return False
    
    # Check if user is already a member
    if user in community.members:
        return True
    
    # Add user to members
    community.members.append(user)
    db.commit()
    
    return True

def leave_community(db: Session, community_id: str, user_id: str) -> bool:
    """Remove a user as a member from a community."""
    # Get the community and user
    community = get_community(db, community_id)
    user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    
    if not community or not user:
        return False
    
    # Check if user is a member
    if user not in community.members:
        return True
    
    # Check if user is creator (creator can't leave)
    if community.creator_id == user_id:
        return False
    
    # Remove user from members
    community.members.remove(user)
    db.commit()
    
    return True 