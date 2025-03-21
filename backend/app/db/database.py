import logging
import os
from typing import Generator, Type

from dotenv import load_dotenv
from sqlalchemy import create_engine, event
from sqlalchemy.engine import Engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import QueuePool

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database configuration
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

DATABASE_URL = "postgresql://postgres:cgiWibDqwOOAtqwscjmtQGOnLRJqVZcm@switchback.proxy.rlwy.net:19612/railway"

# Engine configuration
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=5,
    max_overflow=10,
    pool_timeout=30,
    pool_recycle=1800,
    echo=False,
)

# Session configuration
SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, expire_on_commit=False
)

def get_base() -> Type:
    """Utility function to get Base class."""
    return declarative_base()

Base = get_base()

# Event listener for connect
@event.listens_for(Engine, "connect")
def connect(dbapi_connection, connection_record):
    logger.info("New database connection established")
    connection_record.info["pid"] = os.getpid()

def verify_database_connection() -> bool:
    """Verify database connection is working."""
    try:
        with engine.connect() as connection:
            connection.execute("SELECT 1")
        return True
    except Exception as e:
        logger.error(f"Database connection failed: {str(e)}")
        return False

def get_db() -> Generator[Session, None, None]:
    """Dependency for getting database session."""
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.error(f"Database session error: {str(e)}")
        raise
    finally:
        db.close()

# app/db/database.py

def check_database_health() -> dict:
    """Check database health and return status."""
    try:
        with engine.connect() as connection:
            connection.execute("SELECT 1")
            return {
                "status": "healthy",
                "message": "Database connection successful",
                "pool_size": engine.pool.size(),
                "connections_in_use": engine.pool.checkedin(),
            }
    except Exception as e:
        return {
            "status": "unhealthy",
            "message": str(e),
            "pool_size": 0,
            "connections_in_use": 0,
        }
