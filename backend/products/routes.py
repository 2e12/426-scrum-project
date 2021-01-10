from backend.database import SessionLocal
from backend.products import image as product_images
from backend.products import schemas as product_schema, views as product_views
from backend.users import schemas as user_schema, routes as user_routes
from backend.users.views import get_user_by_id
from fastapi import Depends, APIRouter, HTTPException, UploadFile, File
from fastapi.security import HTTPBasic
from sqlalchemy.orm import Session
from typing import List

product_router = APIRouter()
security = HTTPBasic()


# Dependency
def get_db():
    db = SessionLocal()
    return db


@product_router.post('/{product_id}/buy', response_model=product_schema.ProductOutputSchema)
async def buy_product(product_id: int, db: Session = Depends(get_db),
                      user: user_schema.UserSchema = Depends(user_routes.auth)):
    product = product_views.get_product_by_id(db, product_id)
    if not product.is_sold:
        product.buyer = get_user_by_id(db, user.id)
    else:
        raise HTTPException(
            status_code=423,
            detail="Item is already sold",
        )
    db.commit()
    return product


@product_router.get('/{product_id}', response_model=product_schema.ProductOutputSchema)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    return product_views.get_product_by_id(db, product_id)


@product_router.get(
    '/',
    description="Return a list of unsold products.",
    response_model=List[product_schema.ProductOutputSchema]
)
async def get_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return product_views.get_products(db, skip, limit)


@product_router.post('/', response_model=product_schema.ProductOutputSchema)
async def create_product(product: product_schema.ProductInputSchema,
                         db: Session = Depends(get_db),
                         user: user_schema.UserSchema = Depends(user_routes.auth)):
    return product_views.post_new_product(db, product, user)


@product_router.post('/images', response_model=product_schema.ImageSchema)
async def upload(image: UploadFile = File(...),
                 db: Session = Depends(get_db)):
    return product_images.upload_new_image(image, db)
