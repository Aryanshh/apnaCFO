from langdetect import detect, detect_langs
import logging

class LanguageService:
    @staticmethod
    def detect_language(text: str) -> str:
        """
        Detects the language of the input text.
        Returns ISO code (e.g., 'hi', 'en', 'bn').
        """
        try:
            # Detect primary language
            lang = detect(text)
            return lang
        except Exception as e:
            logging.error(f"Error detecting language: {e}")
            return "hi" # Fallback to Hindi

    @staticmethod
    def get_sarvam_code(lang_code: str) -> str:
        """
        Maps ISO codes to Sarvam AI language codes.
        """
        mapping = {
            "hi": "hi-IN",
            "en": "en-IN",
            "bn": "bn-IN",
            "gu": "gu-IN",
            "kn": "kn-IN",
            "ml": "ml-IN",
            "mr": "mr-IN",
            "or": "or-IN",
            "pa": "pa-IN",
            "ta": "ta-IN",
            "te": "te-IN",
            "ur": "ur-IN"
        }
        return mapping.get(lang_code, "hi-IN")

    @staticmethod
    def is_vernacular_request(text: str) -> bool:
        """
        Checks if the user explicitly asked to change language.
        """
        text = text.lower()
        if "hindi mein" in text or "bhojpuri mein" in text or "english mein" in text:
            return True
        return False
