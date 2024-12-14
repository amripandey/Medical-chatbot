from pydantic import BaseModel, Field
from typing import Literal

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
    f_name: str
    email: str
    h_password: str
    age: int
    gender: Literal["male", "female"]
    
