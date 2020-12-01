from typing import Optional

from pydantic import BaseModel
from backend.users import schemas as user_schemas


class ProductBaseSchema(BaseModel):
    name: str
    value: int
    seller: user_schemas.UserSchema = None
    description: Optional[str] = None

    class Config:
        orm_mode = True


class ProductSchema(ProductBaseSchema):
    id: int
    buyer: user_schemas.UserSchema = None
