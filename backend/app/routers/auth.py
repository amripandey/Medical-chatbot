from typing import Annotated
from datetime import datetime, timedelta, timezone

from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session

from db_schema import User
from pydantic_models import SignInRequest, SignUpRequest, Token
from config import settings
from dependencies import create_access_token, SessionDep, pwd_context 

auth_router = APIRouter()

@auth_router.post("/login",)
async def login(creds: SignInRequest, session: SessionDep) -> Token:
    user = session.query(User).filter(User.Email == creds.email).first()
    
    if not user:
        raise HTTPException(status_code=404,
            headers={"WWW-Authenticate": "Basic"},
            detail="User doesn't exist" )
        
    if not pwd_context.verify(creds.password, user.Hashed_Password):
        raise HTTPException(status_code = 401,
            detail="Incorrect Credentials",
            headers={"WWW-Authenticate": "Basic"})
        
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"email": user.Email}, expires_delta=access_token_expires
    )
    
    return Token(access_token=access_token, token_type="bearer")
    
@auth_router.post("/register")
async def register(request: SignUpRequest, session: SessionDep) -> Token:
    user = session.query(User).filter(User.Email == request.email).first()
    
    if user:
        raise HTTPException(status_code = 401,
            detail="User Already Exist",
            headers={"WWW-Authenticate": "Basic"})
    else:
        hashed_password = pwd_context.hash(request.password)
        
        new_user = User(
            Email=request.email,
            UserName=request.fullname, 
            Hashed_Password=hashed_password,
            Age=request.age,
            Gender = request.gender,
            MedicalHistory = request.medicalHistory,
            CurrentMedications = request.currentMedications,
            Allergies = request.allergies,
        )
        
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"email": new_user.Email}, expires_delta=access_token_expires
        )
        
        return Token(access_token=access_token, token_type="bearer")
        
        
    