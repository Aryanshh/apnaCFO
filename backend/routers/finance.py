from fastapi import APIRouter, HTTPException
import yfinance as yf
from datetime import datetime
import asyncio
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/finance", tags=["Finance"])

class NewsItem(BaseModel):
    title: str
    source: str
    time: str
    type: str

class FinanceLiveResponse(BaseModel):
    market_status: str
    indices: dict
    news: List[NewsItem]

# Cache to avoid rate limiting
_cache = {
    "data": None,
    "last_fetched": None
}
CACHE_DURATION_SECONDS = 300 # 5 minutes

def format_time_ago(ts: int, language: str = 'hi') -> str:
    """Format unix timestamp to '2h ago' format depending on language"""
    now = datetime.now().timestamp()
    diff = now - ts
    hours = int(diff / 3600)
    if hours < 1:
        minutes = int(diff / 60)
        if language == 'bho': return f"{minutes} मिनट पहिले"
        if language == 'hi': return f"{minutes} मिनट पहले"
        return f"{minutes}m ago"
    
    if language == 'bho': return f"{hours} घंटा पहिले"
    if language == 'hi': return f"{hours} घंटे पहले"
    return f"{hours}h ago"

@router.get("/live", response_model=FinanceLiveResponse)
async def get_live_finance(language: str = 'hi'):
    """
    Get live market indices and top news
    """
    global _cache
    now = datetime.now()
    
    if _cache["data"] and _cache["last_fetched"]:
        if (now - _cache["last_fetched"]).total_seconds() < CACHE_DURATION_SECONDS:
            return _cache["data"]

    try:
        # Fetch BSE Sensex ticker for market overview and news
        # ^BSESN is BSE Sensex
        sensex = yf.Ticker("^BSESN")
        
        # Run synchronous yfinance calls in an executor
        loop = asyncio.get_event_loop()
        
        info, news_data = await asyncio.gather(
            loop.run_in_executor(None, lambda: sensex.history(period="1d")),
            loop.run_in_executor(None, lambda: sensex.news)
        )

        indices = {}
        if not info.empty:
            close_price = info['Close'].iloc[-1]
            open_price = info['Open'].iloc[-1]
            change = close_price - open_price
            percent_change = (change / open_price) * 100
            indices["SENSEX"] = {
                "value": round(close_price, 2),
                "change": round(change, 2),
                "percent_change": round(percent_change, 2)
            }

        # Format news
        formatted_news = []
        for n in (news_data or [])[:4]:
            formatted_news.append(NewsItem(
                title=n.get('title', ''),
                source=n.get('publisher', 'Market News'),
                time=format_time_ago(n.get('providerPublishTime', now.timestamp()), language),
                type="market"
            ))

        # Add some mock static news for flavor in specific regional language if yfinance doesn't give good local news
        if not formatted_news:
            if language == 'en':
                formatted_news = [
                    NewsItem(title="RBI Governor hints at repo rate stability", source="Mint", time="2h ago", type="policy"),
                    NewsItem(title="SBI Festive FD rates extended till March 31", source="Economic Times", time="5h ago", type="rate")
                ]
            elif language == 'bho':
                formatted_news = [
                    NewsItem(title="RBI गवर्नर रेपो रेट में बदलाव ना भईला के इशारा कईलें", source="Mint", time="2 घंटा पहिले", type="policy"),
                    NewsItem(title="SBI के फेस्टिव FD रेट 31 मार्च ले बढ़ल", source="Economic Times", time="5 घंटा पहिले", type="rate")
                ]
            else:
                formatted_news = [
                    NewsItem(title="RBI गवर्नर ने रेपो रेट स्थिर रखने के संकेत दिए", source="Mint", time="2 घंटे पहले", type="policy"),
                    NewsItem(title="SBI फेस्टिव FD दरें 31 मार्च तक बढ़ाई गईं", source="Economic Times", time="5 घंटे पहले", type="rate")
                ]

        response_data = FinanceLiveResponse(
            market_status="Open" if 9 <= now.hour < 16 else "Closed",
            indices=indices,
            news=formatted_news
        )

        _cache["data"] = response_data
        _cache["last_fetched"] = now

        return response_data
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
