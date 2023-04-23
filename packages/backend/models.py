from pydantic import BaseModel
from typing import Optional

class PingLocationRequest(BaseModel):
    userid: str
    groupid: str
    latitude: float
    longitude: float
    radius: Optional[float] = 0.01
