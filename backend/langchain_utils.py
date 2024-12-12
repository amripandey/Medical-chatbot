# from ollama import chat, ChatResponse, Client 
# import ollama
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_chroma import Chroma
from sentence_transformers import SentenceTransformer

embed_model = SentenceTransformer("abhinand/MedEmbed-large-v0.1")

# ollama_client = Client(
#     host = 'http://localhost:11434'
# )

llm = OllamaLLM(
    base_url: 'http://localhost:11434',
    model: "qwen2.5:0.5b",
    temperature: 3
)

db = Chroma(
    client=chroma_client,
    collection_name="test",
    embedding_function=embed_model
)

retriever = db.as_retriever()

template = """
You are and doctor assistence 
"""

prompt = PromptTemplate.from_template(template)
def retriever():
    

retrieval_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
)



    
    
    
    
    