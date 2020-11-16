from backend.rooms import models
from backend.rooms import schemas
from sqlalchemy.orm import Session


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_rooms(db: Session):
    return get_auth_user(db).rooms


def get_room(db: Session, room_id: int):
    return db.query(models.Room).filter(models.Room.id == room_id).first()


def create_room(db: Session, room: schemas.RoomBaseSchema):
    new_room = models.Room(name=room.name)
    new_room.members.append(get_auth_user(db))
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room


def get_room_messages(db: Session, room_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Message).filter(models.Message.room_id == room_id).order_by(models.Message.created_date.desc()).offset(skip).limit(limit).all()


def is_user_member_of(db: Session, room_id: int):
    room = db.query(models.Room).filter(models.Room.id == room_id).first()
    return get_auth_user(db) in room.members


def create_room_message(db: Session, message: schemas.MessageBaseSchema):
    new_message = models.Message(room_id=message.room_id, user_id=message.user_id, text=message.text)
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message


def get_auth_user_id():
    return 3


def get_auth_user(db: Session):
    return db.query(models.User).filter(models.User.id == get_auth_user_id()).first()
