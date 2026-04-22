import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from typing import List, Optional

class MemoryService:
    def __init__(self):
        self.uri = os.getenv("MONGODB_URI")
        self.client = AsyncIOMotorClient(self.uri) if self.uri else None
        self.db = self.client["apna_cfo"] if self.client is not None else None
        self.collection = self.db["user_memory"] if self.db is not None else None

    async def save_conversation(self, user_id: str, messages: List[dict]):
        """
        Saves the full chat log.
        """
        if self.collection is None:
            return
        
        entry = {
            "user_id": user_id,
            "messages": messages,
            "timestamp": datetime.now()
        }
        await self.collection.insert_one(entry)

    async def generate_summary(self, user_id: str, messages: List[dict]):
        """
        Generates a summary of the conversation for context injection.
        """
        summary = "User is interested in FDs."
        
        if self.db is not None:
            await self.db["summaries"].update_one(
                {"user_id": user_id},
                {"$set": {"summary": summary, "updated_at": datetime.now()}},
                upsert=True
            )
        return summary

    async def get_user_context(self, user_id: str):
        """
        Retrieves the last summary for context injection.
        """
        if self.db is None:
            return ""
        
        doc = await self.db["summaries"].find_one({"user_id": user_id})
        return doc["summary"] if doc else ""
