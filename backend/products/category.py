from typing import List

from backend.products import schemas as product_schemas
from sqlalchemy.orm import Session

from backend.products.models import Category


def create_category(db: Session, name):
    category = Category(name=name)
    db.add(category)
    db.commit()

    return category


def category_exists(db: Session, name):
    return db.query(db.query(Category).filter_by(name=name).exists()).scalar()


def get_category_by_name(db, name):
    return db.query(Category).filter_by(name=name).first()


def resolve_categories(db: Session, categories: List[product_schemas.CategorySchema]):
    db_categories = []
    for category in categories:
        name = category.name.lower()
        if not category_exists(db, name):
            create_category(db, name)
        db_categories.append(get_category_by_name(db, name))
    return db_categories
