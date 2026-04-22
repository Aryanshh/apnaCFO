from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    user_id: str
    message: str
    language: str = "hi"
    history: Optional[List[Message]] = []

class UserProfile(BaseModel):
    id: str
    phone: str
    name: Optional[str] = None
    preferred_language: str = "hi"
    risk_profile: Optional[str] = None
    created_at: datetime = datetime.now()

class FDRate(BaseModel):
    bank_name: str
    tenor_days: int
    rate_general: float
    rate_senior: Optional[float] = None
    min_amount: Optional[int] = None
    scraped_at: datetime = datetime.now()
