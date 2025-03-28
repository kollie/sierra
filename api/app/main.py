from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, users, events, communities, notifications
from .utils.init_db import init_db

# Create the FastAPI application
app = FastAPI(
    title="Sierra API",
    description="Backend API for Sierra - A Community and Event Management Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with /api prefix to match frontend
app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(events.router, prefix="/api/events", tags=["Events"])
app.include_router(communities.router, prefix="/api/communities", tags=["Communities"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])

# Initialize database tables
init_db()

@app.get("/")
async def root():
    return {"message": "Welcome to Sierra API - Connect with community events"}