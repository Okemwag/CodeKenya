from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import check_database_health, engine, Base
from app.api.routes import app as application_router
from app.models.users import User, University, Course, Applicant, Subscriber

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://www.codekenya.org",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the application router
app.include_router(application_router, prefix="/api", tags=["Applications"])

# Create tables in the database
Base.metadata.create_all(bind=engine)

@app.get("/health")
def health_check():
    return check_database_health()