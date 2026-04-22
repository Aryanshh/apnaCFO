import schedule
import time
import subprocess
import logging

def run_scraper():
    logging.info("Starting scheduled FD rate scraping...")
    try:
        # Run the scrape_banks.py script
        subprocess.run(["python", "scrape_banks.py"], check=True)
        logging.info("Scraping completed successfully.")
    except Exception as e:
        logging.error(f"Scraping failed: {e}")

# Schedule Every 6 hours as per requirements
schedule.every(6).hours.do(run_scraper)

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    logging.info("Scraper scheduler started.")
    # Run once on startup
    run_scraper()
    
    while True:
        schedule.run_pending()
        time.sleep(60)
