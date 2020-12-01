from backend.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey


class Product(Base):
    __tablename__ = "product"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    value = Column(Integer)
    description = Column(String, unique=False, nullable=True)
    seller_id = Column(Integer, ForeignKey('user.id'))
    buyer_id = Column(Integer, ForeignKey('user.id'), nullable=True)

    # foreignKeys relationships
    user_seller = relationship('User', foreign_keys=[seller_id])
    user_buyer = relationship('User', foreign_keys=[buyer_id])
