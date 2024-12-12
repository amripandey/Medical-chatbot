from typing import Annotated, Optional
import uuid
from pydantic import EmailStr, SecretStr
from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

class User(SQLModel, table=True):
    email: str = Field(unique=True ,index=True, nullable=False, description="The user email", primary_key=True)
    hashed_password: str = Field(nullable=False)
    session: str = Field(default_factory=uuid.uuid4)
    name: str = Field(default=None, index=True)
    age: int | None = Field(default=None, index=True)