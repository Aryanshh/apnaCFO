from fastapi import APIRouter, HTTPException, Depends
from models.chat import ChatRequest
from services.mistral_service import MistralService, MISTRAL_SYSTEM_PROMPT
from services.memory_service import MemoryService
from services.language_service import LanguageService
import os

router = APIRouter(prefix="/api/chat", tags=["Chat"])
mistral_service = MistralService()
memory_service = MemoryService()

@router.post("/")
async def chat_endpoint(request: ChatRequest):
    """
    Main chat endpoint using Mistral AI.
    Enforces language purity and continuity based on user selection.
    """
    # 1. Use requested language
    lang = request.language or "hi"
    
    # 2. Retrieve user memory from MongoDB
    user_context = await memory_service.get_user_context(request.user_id)
    
    # 3. Prepare system prompt
    custom_system_prompt = MISTRAL_SYSTEM_PROMPT
    if user_context:
        custom_system_prompt += f"\n\nUSER MEMORY (Previous Context): {user_context}"
    
    # 4. Format history for the AI
    history_formatted = [{"role": m.role, "content": m.content} for m in request.history]
    
    # 5. Get AI Response from Mistral
    response = await mistral_service.get_chat_response(
        message=request.message,
        history=history_formatted,
        system_prompt=custom_system_prompt,
        language=lang
    )
    
    return {
        "response": response, 
        "user_id": request.user_id,
        "language_active": lang
    }

@router.post("/voice")
async def voice_chat_endpoint():
    # Placeholder for voice integration
    return {"message": "Voice functionality coming soon in Phase 4"}
