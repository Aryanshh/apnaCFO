import os
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from typing import List, Optional
from dotenv import load_dotenv

load_dotenv()

class MistralService:
    def __init__(self):
        self.api_key = os.getenv("MISTRAL_API_KEY")
        if not self.api_key:
            # We don't raise error here to allow the server to start even without key initially
            # but we will handle it in the chat method
            pass
        self.client = MistralClient(api_key=self.api_key)
        self.model = "mistral-tiny" # Good for free/cheap tier, "mistral-small" or "mistral-medium" for better quality

    async def get_chat_response(self, message: str, history: List[dict], system_prompt: str, language: str = "hi"):
        """
        Gets a response from Mistral with strict language purity rules.
        """
        if not self.api_key:
            return self._get_error_message(language)

        # Refine system prompt based on language
        purity_instruction = ""
        if language == "en":
            purity_instruction = "\nSTRICT RULE: Use PURE ENGLISH only. No Hindi, No Hinglish, No code-switching."
        elif language == "hi":
            purity_instruction = "\nSTRICT RULE: Use PURE HINDI (Devanagari Script) only. ABSOLUTELY NO ENGLISH WORDS or ALPHABETS. Even for technical terms like 'Fixed Deposit', use Hindi transliteration like 'फिक्स्ड डिपॉजिट' or 'स्थायी जमा' but never 'FD' in English letters."
        elif language == "bho":
            purity_instruction = "\nSTRICT RULE: Use PURE BHOJPURI only. Use regional dialect."

        full_system_prompt = system_prompt + purity_instruction
        
        # Format history for Mistral
        messages = [
            ChatMessage(role="system", content=full_system_prompt)
        ]
        
        for msg in history:
            messages.append(ChatMessage(role=msg["role"], content=msg["content"]))
            
        messages.append(ChatMessage(role="user", content=message))

        try:
            chat_response = self.client.chat(
                model=self.model,
                messages=messages,
            )
            return chat_response.choices[0].message.content
        except Exception as e:
            print(f"Error calling Mistral API: {e}")
            return self._get_error_message(language)

    def _get_error_message(self, language: str):
        if language == "en":
            return "I am sorry, I am experiencing some technical difficulties. Please check your Mistral API key and try again later."
        if language == "bho":
            return "Maafi chahile, abhi ham thoda vyast bani. Aapan Mistral API key check kari aur thoda deri baad koshish kari."
        return "Shama karein, abhi server mein kuch samasya hai. Kripya apna Mistral API key check karein aur baad mein prayas karein."

MISTRAL_SYSTEM_PROMPT = """
You are Apna CFO — a friendly, trusted financial advisor for Bharat. You specialize in Fixed Deposits and savings.

CORE RULES:
1. RESPONSE LANGUAGE: You MUST respond in the EXACT language requested by the system (English, Hindi, or Bhojpuri).
2. PURITY: No mixing languages (No Hinglish). If English mode is active, use only English. If Hindi mode is active, use only Hindi.
3. JARGON: Explain financial terms simply within the chosen language.
4. TONE: Warm, helpful, and respectful.
"""
