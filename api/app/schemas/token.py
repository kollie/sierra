from pydantic import BaseModel
from typing import Optional

# Schema for token response after successful login
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    
# Schema for token payload data
class TokenData(BaseModel):
    sub: Optional[str] = None  # User ID 