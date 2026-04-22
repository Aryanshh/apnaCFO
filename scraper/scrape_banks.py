import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import os
from supabase import create_client, Client

# Mock Supabase credentials for demonstration
# In production, these should be in .env
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

def scrape_sbi_fd_rates():
    """
    Scrapes SBI FD rates (simplified example).
    """
    print("Scraping SBI FD rates...")
    # Real URL: https://www.sbi.co.in/web/interest-rates/deposit-rates/retail-domestic-term-deposits
    # For now, we'll return a sample list as real scraping requires handling complex tables
    return [
        {"bank_name": "SBI", "tenor_days": 365, "rate_general": 6.8, "rate_senior": 7.3, "min_amount": 1000},
        {"bank_name": "SBI", "tenor_days": 730, "rate_general": 7.0, "rate_senior": 7.5, "min_amount": 1000},
        {"bank_name": "SBI", "tenor_days": 1095, "rate_general": 6.75, "rate_senior": 7.25, "min_amount": 1000},
    ]

def scrape_hdfc_fd_rates():
    """
    Scrapes HDFC FD rates (simplified example).
    """
    print("Scraping HDFC FD rates...")
    return [
        {"bank_name": "HDFC", "tenor_days": 365, "rate_general": 6.6, "rate_senior": 7.1, "min_amount": 5000},
        {"bank_name": "HDFC", "tenor_days": 730, "rate_general": 7.1, "rate_senior": 7.6, "min_amount": 5000},
    ]

def save_to_supabase(data):
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("Supabase credentials not found. Printing data instead:")
        print(data)
        return

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    for entry in data:
        supabase.table("fd_rates").upsert(entry).execute()

def main():
    all_rates = []
    all_rates.extend(scrape_sbi_fd_rates())
    all_rates.extend(scrape_hdfc_fd_rates())
    
    save_to_supabase(all_rates)
    print("Scraping completed successfully.")

if __name__ == "__main__":
    main()
