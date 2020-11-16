from pydantic import BaseModel
from typing import List


# Generic Message

class MessageBaseSchema(BaseModel):
    text: str
    room_id: int
    user_id: int

    class Config:
        orm_mode = True


class MessageSchema(MessageBaseSchema):
    id: int


# Generic User

class UserBaseSchema(BaseModel):
    username: str
    email: str

    class Config:
        orm_mode = True


class UserSchema(UserBaseSchema):
    id: int


# Generic Room

class RoomBaseSchema(BaseModel):
    name: str

    class Config:
        orm_mode = True


class RoomSchema(RoomBaseSchema):
    members: List[UserSchema]
    id: int


# Room Membership

class MembershipBaseSchema(BaseModel):
    room_id: int
    user_id: int

    class Config:
        orm_mode = True


class MembershipSchema(MembershipBaseSchema):
    created_date: int
    id: int
