from fastapi import APIRouter, HTTPException
import os

router = APIRouter(prefix="/api/auth", tags=["Auth & KYC"])

@router.post("/otp/send")
async def send_otp(phone: str):
    # Mock OTP sending via Twilio/Firebase
    return {"message": f"OTP sent to {phone}", "status": "success"}

@router.post("/otp/verify")
async def verify_otp(phone: str, code: str):
    return {"message": "OTP verified", "token": "mock-jwt-token"}

@router.get("/kyc/digilocker/init")
async def init_digilocker():
    """
    Returns the DigiLocker authorization URL.
    """
    client_id = os.getenv("DIGILOCKER_CLIENT_ID", "mock_client")
    redirect_uri = "http://localhost:8000/api/auth/kyc/callback"
    auth_url = f"https://dev.digilocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}"
    return {"auth_url": auth_url}

@router.get("/kyc/callback")
async def digilocker_callback(code: str):
    """
    Handles DigiLocker redirect and fetches user documents.
    """
    # In a real app, exchange code for token and fetch Aadhaar/PAN
    return {"message": "KYC Successful", "status": "verified"}
