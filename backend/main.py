from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import check_database_health
from app.api.routes import app as application_router

app = FastAPI ()
origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000",  
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

@app.get("/health")
def health_check():
    return check_database_health()
