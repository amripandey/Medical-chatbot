from fastapi import Depends, APIRouter, HTTPException
from typing import Annotated
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlmodel import Session

from db import engine
from db_schema import User
from pydantic_models import LoginRequest 

auth_router = APIRouter()
security = HTTPBasic()

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

# collection = chroma_client.get_or_create_collection(name="Users")


# @auth_router.get("/login")
# async def logIn(credential: Annotated[HTTPBasicCredentials, Depends(security)]):
#     return {"username": credential.username, "password": credential.password}


@auth_router.post("/login",)
async def login(user: LoginRequest, session: SessionDep):
    user = session.get(User, user.email)
    
    if not user:
        raise HTTPException(status_code=404, detail="Hero not found")
    return user
    
@auth_router.post("/register")
async def register(user: User, session: SessionDep) -> User:
    print(user)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
    