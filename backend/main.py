from typing import Union
from fastapi import FastAPI
from pydantic_models import QueryInput, QueryResponse
from fastapi.middleware.cors import CORSMiddleware

from routers.auth import auth_router
from routers.chat import chat_router
from db import create_db_and_tables

Ollama_url = "http://localhost:11434/api/generate"


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3000/auth/signIn",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
    
