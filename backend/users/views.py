from backend.users import models as user_model
from sqlalchemy.orm import Session


def get_user(db: Session, user_id: int):
    return get_user_by_id(db, user_id)


def get_user_by_id(db: Session, user_id: int):
    return db.query(user_model.User).filter(user_model.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(user_model.User).filter(user_model.User.username == username).first()
