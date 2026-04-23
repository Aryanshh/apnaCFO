import os
import asyncio
from mistralai.client import Mistral
from typing import List, Optional
from dotenv import load_dotenv

load_dotenv()

class MistralService:
    def __init__(self):
        self.api_key = os.getenv("MISTRAL_API_KEY")
        if not self.api_key:
            # We provide a dummy key so the startup module doesn't crash uvicorn outright
            # on platforms like Render where ENV vars might not be injected immediately.
            self.api_key = "dummy_key_waiting_for_env"
        self.client = Mistral(api_key=self.api_key)
        self.model = "mistral-tiny"

    async def get_chat_response(self, message: str, history: List[dict], system_prompt: str, language: str = "hi"):
        """
        Gets a response from Mistral with strict language purity rules.
        """
        if not self.api_key:
            return self._get_error_message(language)

        purity_instruction = ""
        if language == "en":
            purity_instruction = "\nSTRICT RULE: Use PURE ENGLISH only. No Hindi, No Hinglish, No code-switching."
        elif language == "hi":
            purity_instruction = "\nSTRICT RULE: Use PURE HINDI (Devanagari Script) only. ABSOLUTELY NO ENGLISH WORDS or ALPHABETS. Even for technical terms like 'Fixed Deposit', use Hindi transliteration like 'फिक्स्ड डिपॉजिट' or 'स्थायी जमा' but never 'FD' in English letters."
        elif language == "bho":
            purity_instruction = "\nSTRICT RULE: Use PURE BHOJPURI only. Use regional dialect."

        full_system_prompt = system_prompt + purity_instruction
        
        messages = [
            {"role": "system", "content": full_system_prompt}
        ]
        
        for msg in history:
            messages.append({"role": msg["role"], "content": msg["content"]})
            
        messages.append({"role": "user", "content": message})

        try:
            # Run the synchronous Mistral client in a thread pool to avoid blocking the event loop
            loop = asyncio.get_event_loop()
            chat_response = await loop.run_in_executor(
                None,
                lambda: self.client.chat.complete(
                    model=self.model,
                    messages=messages,
                )
            )
            return chat_response.choices[0].message.content
        except Exception as e:
            import traceback
            print(f"❌ Mistral API Error: {e}")
            traceback.print_exc()
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
1. RESPONSE LANGUAGE: You MUST respond in the EXACT language requested by the system (English, Hindi, or Bhojpuri). No mixing, no exceptions.
2. PURITY: Absolutely NO code-switching. If English mode is active, use only English. If Hindi mode is active, use only Hindi.
3. STRUCTURE: Your answers MUST be well-structured. Use markdown `**bold**` to highlight important terms or percentages. Use empty lines `\n` to separate paragraphs cleanly. Use numbered lists (`1., 2.`) or bullet points (`-`) whenever presenting options.
4. JARGON: Explain financial terms simply within the chosen language.
5. TONE: Warm, extremely helpful, and deeply respectful.
"""
