from typing import Union
from fastapi import FastAPI
from pydantic_models import QueryInput, QueryResponse
from fastapi.middleware.cors import CORSMiddleware

from routers.auth import auth_router
from routers.chat import chat_router
from db import create_db_and_tables
from config import settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOW_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix = "/api/v1/auth",
)

app.include_router(
    chat_router,
    prefix="/api/v1/chat"
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    
@app.head("/check")
@app.get("/check")
def info():
    return {
        "App_Name": settings.APP_NAME,
    }