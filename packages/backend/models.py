from pydantic import BaseModel

class PingLocationRequest(BaseModel):
    userid: str
    groupid: str
    latitude: float
    longitude: float