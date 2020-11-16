from backend.database import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
import datetime


membership_table = Table('membership', Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id')),
    Column('room_id', Integer, ForeignKey('room.id'))
)


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True)
    messages = relationship("Message")
    rooms = relationship(
        "Room",
        secondary=membership_table,
        back_populates="members")


class Room(Base):
    __tablename__ = "room"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    messages = relationship("Message")
    members = relationship(
        "User",
        secondary=membership_table,
        back_populates="rooms")


class Message(Base):
    __tablename__ = "message"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    created_date = Column(Integer, default=datetime.datetime.utcnow)
    room_id = Column(Integer, ForeignKey('room.id'))
    user_id = Column(Integer, ForeignKey('user.id'))
