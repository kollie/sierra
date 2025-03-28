from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Dict, Any

from .. import models, schemas
from ..database import get_db
from ..utils.security import verify_password, create_access_token, get_password_hash
from ..crud import user as user_crud

router = APIRouter()

@router.post("/register", response_model=schemas.user.User, status_code=status.HTTP_201_CREATED)
async def register(user_data: schemas.user.UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    """
    # Check if user with this email already exists
    db_user = user_crud.get_user_by_email(db, email=user_data.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Create the user
    return user_crud.create_user(db=db, user=user_data)

@router.post("/login", response_model=schemas.token.Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    # Authenticate user
    user = user_crud.get_user_by_email(db, email=form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id})
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login/json", response_model=schemas.token.Token)
async def login_json(login_data: schemas.auth.Login, db: Session = Depends(get_db)):
    """
    JSON login endpoint, alternative to the OAuth2 form-based login.
    """
    # Authenticate user
    user = user_crud.get_user_by_email(db, email=login_data.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
        
    if not verify_password(login_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id})
    
    return {"access_token": access_token, "token_type": "bearer"} 