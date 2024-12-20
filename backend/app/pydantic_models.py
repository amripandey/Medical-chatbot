from pydantic import BaseModel, Field
from typing import Literal, Optional

class QueryInput(BaseModel):
    prompt: str
    # session_id: str = Field(default=None)

class QueryResponse(BaseModel):
    answer: str
    session_id: str
    
class SignInRequest(BaseModel):
    email: str
    password: str
    
class SignUpRequest(BaseModel):
    fullname: str 
    email: str
    password: str
    age: int | None = None
    gender: Literal["male", "female"]
    medicalHistory: str | None = None
    currentMedications: str | None = None
    allergies: str | None = None
    
class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    email: str | None = None
    
