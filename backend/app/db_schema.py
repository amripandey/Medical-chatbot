from sqlalchemy import Column, Integer, String
from db import Base

class User(Base):
    __tablename__ = "User"
    
    Id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    Email = Column(String, index=True, unique=True)
    UserName = Column(String, nullable=False)
    Hashed_Password = Column(String, nullable=False)
    Age = Column(Integer, nullable=True)
    Gender = Column(String, nullable=True)
    MedicalHistory = Column(String, nullable=True)
    CurrentMedications = Column(String, nullable=True) 
    Allergies = Column(String, nullable=True)
