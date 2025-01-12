from fastapi import FastAPI
from app.db.database import check_database_health
from app.api.routes import app as application_router

app = FastAPI ()

# Include the application router
app.include_router(application_router, prefix="/api", tags=["Applications"])

@app.get("/health")
def health_check():
    return check_database_health()
