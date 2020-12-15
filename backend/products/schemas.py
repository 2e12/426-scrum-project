from typing import Optional, List

from pydantic import BaseModel
from backend.users import schemas as user_schemas


class CategoryBaseSchema(BaseModel):
    name: str

    class Config:
        orm_mode = True


class CategorySchema(CategoryBaseSchema):
    id: Optional[int]


class ProductBaseSchema(BaseModel):
    name: str
    value: int
    seller: user_schemas.UserSchema = None
    description: Optional[str] = None
    categories: List[CategorySchema]

    class Config:
        orm_mode = True


class ProductSchema(ProductBaseSchema):
    id: int
    buyer: user_schemas.UserSchema = None
