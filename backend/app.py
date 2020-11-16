from backend.database import SessionLocal, engine
from backend.rooms import models, schemas, views
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from starlette.staticfiles import StaticFiles
from typing import List

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/s", StaticFiles(directory="frontend"), name="static")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/user/{user_id}", response_model=schemas.UserSchema)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = views.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.get("/room", response_model=List[schemas.RoomSchema])
def get_rooms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return views.get_rooms(db)


@app.post("/room")
def create_room(room: schemas.RoomBaseSchema, db: Session = Depends(get_db)):
    return views.create_room(db, room)


@app.get("/room/{room_id}", response_model=schemas.RoomSchema)
def get_room(room_id: int, db: Session = Depends(get_db)):
    room = views.get_room(db, room_id=room_id)
    if not views.is_user_member_of(db, room_id):
        raise HTTPException(status_code=401, detail='Unauthorized')
    return room


@app.get("/room/{room_id}/messages")
def get_room_messages(room_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    if not views.is_user_member_of(db, room_id):
        raise HTTPException(status_code=401, detail='Unauthorized')
    return views.get_room_messages(db, skip=skip, limit=limit, room_id=room_id)


@app.post("/room/{room_id}/messages")
def create_room_message(message: schemas.MessageBaseSchema, db: Session = Depends(get_db)):
    if not views.is_user_member_of(db, message.room_id):
        raise HTTPException(status_code=401, detail='Unauthorized')
    return views.create_room_message(db, message)
