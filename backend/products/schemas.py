from typing import Optional, List

from pydantic import BaseModel
from backend.users import schemas as user_schemas


class ImageBaseSchema(BaseModel):
    name: str
    url: str

    class Config:
        orm_mode = True


class ProductBaseSchema(BaseModel):
    name: str
    value: int
    seller: user_schemas.UserSchema = None
    images: List[ImageBaseSchema] = []
    description: Optional[str] = None

    class Config:
        orm_mode = True


class ProductSchema(ProductBaseSchema):
    id: int
    buyer: user_schemas.UserSchema = None


class ImageSchema(ImageBaseSchema):
    id: int
    product: ProductSchema = None
