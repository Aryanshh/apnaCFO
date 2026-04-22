import os

class NotificationService:
    @staticmethod
    def send_whatsapp_alert(phone: str, message: str):
        """
        Sends a WhatsApp message via Meta Cloud API or Twilio.
        """
        # Mock implementation
        print(f"Sending WhatsApp Alert to {phone}: {message}")
        return True

    @staticmethod
    def schedule_maturity_reminder(user_id: str, booking_id: str, days_before: int):
        """
        Schedules a reminder for FD maturity.
        """
        # Mock scheduling logic
        print(f"Scheduled maturity reminder for {user_id} - {days_before} days before.")
        return True
