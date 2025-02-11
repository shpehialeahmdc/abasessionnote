# /backend/api/models.py
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class Client(BaseModel):
    id: Optional[int]
    first_name: str
    last_name: str
    dob: datetime
    medicaid_number: Optional[str]
    diagnosis: List[str]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

class Assessment(BaseModel):
    id: Optional[int]
    client_id: int
    assessment_type: str
    assessment_date: datetime
    pdf_path: str
    parsed_data: dict
    created_at: Optional[datetime]

class Session(BaseModel):
    id: Optional[int]
    client_id: int
    session_date: datetime
    start_time: datetime
    end_time: datetime
    environment: List[str]
    participants: List[str]
    emotional_state: str
    medical_concerns: Optional[str]
    created_at: Optional[datetime]

class ABCData(BaseModel):
    id: Optional[int]
    session_id: int
    antecedent: str
    behavior: str
    consequence: str
    intervention: List[str]
    reinforcers: List[str]
    created_at: Optional[datetime]

class ReinforcementSchedule(BaseModel):
    id: Optional[int]
    client_id: int
    schedule_type: str
    reinforcer_type: str
    reinforcer_items: List[str]
    schedule_details: dict
    created_at: Optional[datetime]
