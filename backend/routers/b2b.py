from fastapi import APIRouter, Header, HTTPException, Depends
from typing import Optional
import datetime

router = APIRouter(prefix="/b2b/v1", tags=["B2B White-Label"])

# Mock DB for token tracking
token_usage = {}

async def verify_partner(x_api_key: str = Header(...)):
    if x_api_key != "prod_key_apna_cfo":
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return "partner_123"

@router.post("/chat")
async def b2b_chat(
    message: str, 
    partner_id: str = Depends(verify_partner),
    x_brand_color: Optional[str] = Header("#059669")
):
    """
    Partner-branded chat endpoint with token tracking.
    """
    # Track usage (Simulate)
    usage = len(message.split()) # Simple word count as token mock
    today = datetime.date.today().isoformat()
    
    if partner_id not in token_usage:
        token_usage[partner_id] = {}
    if today not in token_usage[partner_id]:
        token_usage[partner_id][today] = 0
        
    token_usage[partner_id][today] += usage
    
    return {
        "response": f"Message handled for partner {partner_id}", 
        "partner_id": partner_id,
        "brand_color": x_brand_color,
        "tokens_used": usage
    }

@router.get("/analytics")
async def partner_analytics(partner_id: str = Depends(verify_partner)):
    today = datetime.date.today().isoformat()
    return {
        "partner_id": partner_id,
        "total_conversations": 1250,
        "total_bookings": 45,
        "conversion_rate": "3.6%",
        "languages": {"hi": 800, "bho": 300, "mai": 150},
        "token_usage_today": token_usage.get(partner_id, {}).get(today, 0)
    }
