from typing import List
from pydantic import BaseModel


class Music(BaseModel):
    org_id: str
    room_id: str
    memberId: List = []


class MessageError(BaseModel):
    message: str