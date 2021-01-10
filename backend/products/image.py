import os
from typing import List

from fastapi import HTTPException

from backend.products import schemas as product_schemas
from sqlalchemy.orm import Session
from PIL import Image, UnidentifiedImageError

from backend.products import models

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
images_dir = os.path.join(ROOT_DIR, "images")


def upload_new_image(image, db: Session):
    try:
        img = Image.open(image.file)
    except UnidentifiedImageError:
        raise HTTPException(status_code=415, detail="Unsupported or malformed Media Type")

    # new db image entry
    new_image = models.Image()
    db.add(new_image)
    db.commit()

    # file system upload
    compact_image = img.convert('RGB')
    filename = str(new_image.id) + ".jpg"
    file_location = os.path.join(images_dir, filename)
    compact_image.save(file_location)

    return new_image


def get_image_by_id(db: Session, id: int):
    return db.query(models.Image).filter_by(id=id).first()


def resolve_images(db: Session, images: List[product_schemas.ImageBaseSchema]):
    db_images = []
    for image in images:
        db_images.append(get_image_by_id(db, image.id))
    return db_images