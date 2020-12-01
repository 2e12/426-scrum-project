from typing import Optional

from pydantic import BaseModel


class ProductBaseSchema(BaseModel):
    name: str
    value: int
    seller_id: int
    description: Optional[str] = None

    class Config:
        orm_mode = True


class ProductSchema(ProductBaseSchema):
    id: int
    buyer_id: int
