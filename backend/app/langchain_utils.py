# from ollama import chat, ChatResponse, Client 
# import ollama
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough
from langchain_chroma import Chroma
# from langchain.callbacks.base import BaseCallbackHandler

from langchain_community.embeddings import HuggingFaceEmbeddings

from config import settings
from db import chroma_client

embed_model = HuggingFaceEmbeddings(model_name=settings.EMBEDDING_MODEL)
# embed_model = SentenceTransformer(settings.EMBEDDING_MODEL)

# ollama_client = Client(
#     host = 'http://localhost:11434'
# )

# class StreamingCallbackHandler(BaseCallbackHandler):
#     def __init__(self):
#         self.partial_output = ""

#     def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
#         self.partial_output += token
#         print(token, end="", flush=True)

llm = OllamaLLM(
    base_url = "http://localhost:11434/",
    model = "qwen2.5:0.5b",
    temperature = 3
)

db = Chroma(
    client=chroma_client,
    collection_name="test",
    embedding_function=embed_model,
    collection_metadata={"hnsw:space": "cosine"}
    # relevance_score_fn = custome relevance_score function 
)

retriever = db.as_retriever(
    search_type = 'mmr',
    search_kwargs={'k': 10, 'fetch_k': 30, 'lambda_mult': 0.25 }
    )

prompt = PromptTemplate(
    template="""You are an medical assistant AI trained to assist with symptoms analysis.Your goal is to ask as few questions as possible to determine a probable condition while being thorough and efficient.Use the following documents to guide your question.
    Question: {question}
    Documents: {documents}
    Answer:
    """,
    input_variables=["question", "documents"],
)    

rag_chain = (
    {
        "documents": db.as_retriever(),
        "question" : RunnablePassthrough()
    }
    | prompt
    | llm
    | StrOutputParser()
)
    
    
    
    
    