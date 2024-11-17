# from typing import Generator, Optional
# from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError
# from pydantic import ValidationError
# from sqlalchemy.orm import Session

# from app.core.config import settings
# from app.core.security import verify_access_token
# from app.db.session import SessionLocal
# from app.models.user import User
# from app.schemas.auth import TokenPayload

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")


# # Database dependency
# def get_db() -> Generator:
#     try:
#         db = SessionLocal()
#         yield db
#     finally:
#         db.close()


# # Current user dependency
# async def get_current_user(
#     db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
# ) -> User:
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = verify_access_token(token)
#         token_data = TokenPayload(**payload)
#     except (JWTError, ValidationError):
#         raise credentials_exception

#     user = db.query(User).filter(User.id == token_data.sub).first()
#     if not user:
#         raise credentials_exception
#     if not user.is_active:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user"
#         )
#     return user


# # Active superuser dependency
# def get_current_active_superuser(
#     current_user: User = Depends(get_current_user),
# ) -> User:
#     if not current_user.is_superuser:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="The user doesn't have enough privileges",
#         )
#     return current_user


# # Optional current user dependency
# async def get_optional_current_user(
#     db: Session = Depends(get_db), token: Optional[str] = Depends(oauth2_scheme)
# ) -> Optional[User]:
#     if token is None:
#         return None
#     try:
#         return await get_current_user(db, token)
#     except HTTPException:
#         return None


# # Pagination dependency
# class PaginationParams:
#     def __init__(
#         self,
#         page: int = 1,
#         page_size: int = settings.DEFAULT_PAGE_SIZE,
#         max_page_size: int = settings.MAX_PAGE_SIZE,
#     ):
#         self.page = page
#         self.page_size = min(page_size, max_page_size)
#         self.skip = (page - 1) * page_size


# # Program access verification dependency
# async def verify_program_access(
#     program_id: int,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db),
# ) -> bool:
#     # Check if user has access to the program
#     application = (
#         db.query(Application)
#         .filter(
#             Application.program_id == program_id,
#             Application.user_id == current_user.id,
#             Application.status == ApplicationStatus.APPROVED,
#         )
#         .first()
#     )

#     if not application and not current_user.is_superuser:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="You don't have access to this program",
#         )
#     return True


# # Rate limiting dependency
# async def rate_limit(
#     current_user: Optional[User] = Depends(get_optional_current_user),
# ) -> None:
#     # Implement rate limiting logic here
#     # You might want to use Redis or similar for tracking request counts
#     pass


# # File upload size limit dependency
# async def validate_file_size(
#     file_size: int, max_size: int = settings.MAX_UPLOAD_SIZE
# ) -> None:
#     if file_size > max_size:
#         raise HTTPException(
#             status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
#             detail=f"File size exceeds maximum allowed size of {max_size} bytes",
#         )
