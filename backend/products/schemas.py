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
    description: Optional[str] = None
    categories: Optional[List[CategorySchema]]

    class Config:
        orm_mode = True


class ProductSchema(ProductBaseSchema):
    id: int
    seller: user_schemas.UserSchema = None
    buyer: user_schemas.UserSchema = None
