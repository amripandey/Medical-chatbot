import requests
import json

from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import StreamingResponse
from langchain.prompts import PromptTemplate


from pydantic_models import QueryInput
from  config import settings
# from Assistant.assistant import RAGApplication
from langchain_utils import rag_chain


chat_router = APIRouter()

def prompt(question, documents):
    return f"""You are an medical assistant AI trained to assist with symptoms analysis.
    Diagnosis the patient with follow up questions and determine the patient condition.
    if you are not sure about the disease, say I am sorry unnable to diagnose the disease.
    Use the following documents to guide your next question.
    Question: {question}
    Documents: {documents}"""
    
@chat_router.post("/")
async def chat(query: QueryInput):  
    documents = f"""Allergy symptoms can range from mild to severe, and can include:
                    Skin: Itchy skin, hives, rash, blisters, or peeling skin 
                    Eyes: Red, watery, itchy eyes, or swollen eyes 
                    Nose: Runny nose, stuffy nose, sneezing, or post nasal drip 
                    Throat: Itchy throat, swelling of the tongue or throat, or tightness of the throat 
                    Breathing: Wheezing, persistent cough, or breathing problems 
                    Other: Headache, fatigue, abdominal pain, nausea, vomiting, or diarrhea"""

    headers = {"Content-Type": "application/json"}
    data = {
        "model": settings.MODEL,
        "stream": True,
        "prompt": prompt(query.prompt, documents)
    }
    
    try:
        response = requests.post(
            settings.OLLAMA_URL,
            headers =headers,
            data = json.dumps(data),
            stream = True
        )
        
        response.raise_for_status()
        
        def stream_generator():
            for chunk in response.iter_content(chunk_size = 1024):
                if chunk:
                    yield chunk
        
        return StreamingResponse(
            stream_generator(),
            media_type = "application/json"            
        )
        
    except requests.RequestException as e:
        raise HTTPException(
            status_code = 500,
            detail=f"Error communicating with Ollama: {str(e)}"
        )

# @chat_router.post("/ragchat")
# def ragchat(query):
#    rag_application = RAGApplication(retriever, rag_chain)
#    question = query.prompt
#    response = rag_application.run(question)
   

   
@chat_router.post("/test")
def test(query: QueryInput):
    response = rag_chain.stream(query.prompt)
    return response