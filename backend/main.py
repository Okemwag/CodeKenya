from fastapi import FastAPI
from app.db.database import check_database_health, init_db

app = FastAPI()


@app.on_event("startup")
async def startup_event():
    init_db()


@app.get("/health")
def health_check():
    return check_database_health()
