from fastapi import APIRouter

from langchain.prompts import PromptTemplate

from pydantic_models import QueryInput
chat_router = APIRouter()


@chat_router.post("/chat")
async def chat(message: QueryInput) -> str:
    