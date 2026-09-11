import os
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.sql import func
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Local pe SQLite chalega, Render pe PostgreSQL
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./local_hackathon.db")
if DATABASE_URL.startswith("postgres://"): DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

# Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Complaint(Base):
    __tablename__ = "complaints"
    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(String, unique=True)
    crime_category = Column(String)
    transaction_amount = Column(Float)
    district = Column(String)
    risk_score = Column(Float, default=0.0)
    risk_level = Column(String, default="Low")
    predicted_lat = Column(Float, nullable=True)
    predicted_lon = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    severity = Column(String)
    message = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# Schemas
class ComplaintCreate(BaseModel):
    crime_category: str; transaction_amount: float; district: str; suspected_lat: float; suspected_lon: float