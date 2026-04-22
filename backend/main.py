from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from routers import chat, fd, auth, b2b, finance
import time

# Rate Limiter setup
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="Apna CFO API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Include Routers
app.include_router(chat.router)
app.include_router(fd.router)
app.include_router(auth.router)
app.include_router(b2b.router)
app.include_router(finance.router)

# Production CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change to specific domains in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

@app.get("/health")
@app.get("/")
async def root():
    """
    Consolidated health check and root endpoint.
    """
    return {
        "app": "Apna CFO API",
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": time.time()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
