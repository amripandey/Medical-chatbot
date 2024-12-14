import uuid
from langchain.document_loaders import PyPDFLoader, DirectoryLoader
from langchain_experimental.text_splitter import SemanticChunker

from langchain_utils import embed_model
from db import collection

def get_pdf_chunks():
    #Extract data from the pdf
    def load_pdf(data):
        loader = DirectoryLoader(data,
                        glob="*.pdf",
                        loader_cls=PyPDFLoader,
                        show_progress=True)
        
        documents = loader.load()
        
        return documents
    
    extracted_data = laod_pdf("docs/")
    
    def text_split(extracted_data):
        text_splitter = SemanticChunker(
            embed_model, breaking_threshold_type="gradient"
        )
        
        text_chunks = text_splitter.split_documents(extracted_data)
        return text_chunks
    
    text_chunks = text_split(extracted_data)
    print("length of my chunks:", len(text_chunks))
    
    return text_chunks

docs = get_pdf_chunks()

for doc in docs:
    collection.add(
        ids=[str(uuid.uuid4())],
        metadata = doc.metadata,
        documents = doc.page_content
    )


        