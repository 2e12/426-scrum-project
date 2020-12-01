from backend.products import models as product_model
from backend.products import schemas as product_schemas
from sqlalchemy.orm import Session


def get_product_by_id(db: Session, product_id: int):
    return db.query(product_model.Product).filter(product_model.Product.id == product_id).first()


def get_product(db: Session, product_id: int):
    return get_product_by_id(db, product_id)


def get_products(db: Session, skip: int, limit: int):
    return db.query(product_model.Product).offset(skip).limit(limit).all()


def post_new_product(db: Session, product: product_schemas.ProductBaseSchema):
    new_product = product_model.Product()
    new_product.name = product.name
    new_product.value = product.value
    new_product.description = product.description
    new_product.seller_id = product.seller.id
    db.add(new_product)
    db.commit()
    return product
