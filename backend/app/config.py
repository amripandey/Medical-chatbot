from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str =  "Medical Chatbot Backend"
    ALLOW_ORIGINS: str = "http://localhost:3000/*"
    
    OLLAMA_URL: str = "http://localhost:11434/api/generate"
    MODEL: str = "qwen2.5:0.5b"
    
    # EMBEDDING_MODEL : str = "abhinand/MedEmbed-large-v0.1"
    EMBEDDING_MODEL : str = "thenlper/gte-small"
    EMBEDDING_DIMENSION: int = 0
    VECTOR_SEARCH_TOP_K: int = 10
    CHROMA_COLLECTION :str = "test"
    SQLITE_FILE : str = "sqlite.db"
    
    SECRET_KEY: str = "59c3f36c41ea29130797fb52f729beaecbac88fd99acfefb250e33848b66a159"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
     
    
settings = Settings()