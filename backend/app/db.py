import chromadb
from sqlmodel import create_engine, SQLModel

from config import settings 


'''-----------------chromadb-----------------'''
chroma_client = chromadb.HttpClient(
    host='localhost',
    port=8000
)

collection = chroma_client.get_or_create_collection(name=settings.CHROMA_COLLECTION)

print("chromadb: ", chroma_client.heartbeat())

'''----------------sqlite--------------------'''
sqlite_file_name = settings.SQLITE_FILE
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
