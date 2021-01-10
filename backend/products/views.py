from backend.products import models as product_model
from backend.products import schemas as product_schemas
from backend.products.category import resolve_categories
from backend.products.image import resolve_images
from backend.users import schemas as user_schema
from backend.users.views import get_user_by_id
from sqlalchemy.orm import Session


def get_product_by_id(db: Session, product_id: int):
    return db.query(product_model.Product).filter(product_model.Product.id == product_id).first()


def get_product(db: Session, product_id: int):
    return get_product_by_id(db, product_id)


def get_products(db: Session, skip: int, limit: int):
    return db.query(product_model.Product).filter(product_model.Product.buyer == None).offset(skip).limit(limit).all()


def post_new_product(db: Session, product: product_schemas.ProductInputSchema, user: user_schema.UserSchema):
    new_product = product_model.Product()
    if product.categories:
        new_product.categories = resolve_categories(db, product.categories)
    new_product.name = product.name
    new_product.value = product.value
    new_product.description = product.description
    if product.images:
        new_product.images = resolve_images(db, product.images)
    new_product.seller = get_user_by_id(db, user.id)
    db.add(new_product)
    db.commit()
    #new_product.images = store_product_images(db, images, new_product.id)
    return new_product

# def store_product_images(db: Session, images, id: int):
#     db_images = []
#     for image in images:
#         new_image = product_model.Image()
#         new_image.product_id = id
#         upload_image_to_filesystem(image.file, new_image.id)
#         db.add(new_image)
#
#         db_images.append(new_image)
#     return db_images
