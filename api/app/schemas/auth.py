from pydantic import BaseModel, EmailStr
from typing import Optional

# Schema for login requests
class Login(BaseModel):
    email: EmailStr
    password: str
    
# Schema for password change
class PasswordChange(BaseModel):
    current_password: str
    new_password: str 