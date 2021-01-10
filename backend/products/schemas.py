from typing import Optional, List

from pydantic import BaseModel
from backend.users import schemas as user_schemas


class CategoryBaseSchema(BaseModel):
    name: str

    class Config:
        orm_mode = True


class CategorySchema(CategoryBaseSchema):
    id: Optional[int]


class ImageBaseSchema(BaseModel):
    id: int

    class Config:
        orm_mode = True


class ImageSchema(ImageBaseSchema):
    url: str


class ProductBaseSchema(BaseModel):
    name: str
    value: int
    description: Optional[str] = None
    categories: Optional[List[CategorySchema]]

    class Config:
        orm_mode = True


class ProductInputSchema(ProductBaseSchema):
    images: List[ImageBaseSchema]


class ProductOutputSchema(ProductBaseSchema):
    id: int
    images: List[ImageSchema]
    seller: user_schemas.UserSchema = None
    buyer: user_schemas.UserSchema = None
