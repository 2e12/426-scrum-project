from backend.database import SessionLocal
from backend.products import schemas as product_schema, views as product_views
from backend.users import schemas as user_schema, routes as user_routes
from typing import List
from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter
from fastapi.security import HTTPBasic

product_router = APIRouter()
security = HTTPBasic()


# Dependency
def get_db():
    db = SessionLocal()
    return db


@product_router.get('/{product_id}', response_model=product_schema.ProductSchema)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    return product_views.get_product_by_id(db, product_id)


@product_router.get('/', response_model=List[product_schema.ProductSchema])
async def get_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return product_views.get_products(db, skip, limit)


@product_router.post('/', response_model=product_schema.ProductSchema)
async def create_product(product: product_schema.ProductBaseSchema, db: Session = Depends(get_db), user: user_schema.UserSchema = Depends(user_routes.auth)):
    return product_views.post_new_product(db, product, user)
