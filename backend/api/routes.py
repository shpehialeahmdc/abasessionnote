# /backend/api/routes.py
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from .models import (
    Client,
    Assessment,
    Session,
    ABCData,
    ReinforcementSchedule
)
from .controllers import (
    ClientController,
    AssessmentController,
    SessionController
)

router = APIRouter()

@router.post("/clients/", response_model=Client)
async def create_client(client: Client):
    return await ClientController.create(client)

@router.get("/clients/{client_id}", response_model=Client)
async def get_client(client_id: int):
    return await ClientController.get(client_id)

@router.post("/assessments/", response_model=Assessment)
async def create_assessment(assessment: Assessment):
    return await AssessmentController.create(assessment)

@router.post("/sessions/", response_model=Session)
async def create_session(session: Session):
    return await SessionController.create(session)

@router.post("/sessions/{session_id}/abc", response_model=List[ABCData])
async def add_abc_data(session_id: int, abc_data: List[ABCData]):
    return await SessionController.add_abc_data(session_id, abc_data)

@router.post("/clients/{client_id}/reinforcement-schedule", 
             response_model=ReinforcementSchedule)
async def set_reinforcement_schedule(
    client_id: int,
    schedule: ReinforcementSchedule
):
    return await ClientController.set_reinforcement_schedule(client_id, schedule)
