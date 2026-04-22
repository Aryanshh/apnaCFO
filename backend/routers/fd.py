from fastapi import APIRouter, HTTPException
from services.fd_service import FDService
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter(prefix="/api/fd", tags=["FD Engine"])

class CalculationRequest(BaseModel):
    amount: float
    rate: float
    tenor_days: int

@router.post("/calculate")
async def calculate_fd(request: CalculationRequest):
    return FDService.calculate_maturity(
        amount=request.amount,
        rate=request.rate,
        tenor_days=request.tenor_days
    )

@router.get("/compare")
async def compare_fds(tenor_days: int = 365):
    # Mock data for now, in production fetch from Supabase
    mock_rates = [
        {"bank_name": "SBI", "tenor_days": 365, "rate_general": 6.8, "rate_senior": 7.3},
        {"bank_name": "HDFC", "tenor_days": 365, "rate_general": 6.6, "rate_senior": 7.1},
        {"bank_name": "AU Small Finance", "tenor_days": 365, "rate_general": 7.75, "rate_senior": 8.25},
    ]
    # Filter/Compare logic (simplified)
    return sorted(mock_rates, key=lambda x: x["rate_general"], reverse=True)
