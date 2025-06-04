from typing import Any, Dict

from pydantic import BaseModel


class WebhookEvent(BaseModel):
    event: str
    data: Dict[str, Any]
    signature: str