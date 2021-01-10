from sqlalchemy.ext.hybrid import hybrid_property
from backend.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from backend.users.models import User

category_product_table = Table('category_product', Base.metadata,
    Column('category_id', Integer, ForeignKey('category.id')),
    Column('product_id', Integer, ForeignKey('product.id'))
)


class Product(Base):
    __tablename__ = "product"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    value = Column(Integer)
    description = Column(String, unique=False, nullable=True)
    seller_id = Column(Integer, ForeignKey('user.id'))
    buyer_id = Column(Integer, ForeignKey('user.id'), nullable=True)

    # foreignKeys relationships
    seller = relationship(User, foreign_keys=[seller_id])
    buyer = relationship(User, foreign_keys=[buyer_id])

    images = relationship('Image')

    categories = relationship(
        "Category",
        secondary=category_product_table,
        back_populates="products")

    @hybrid_property
    def is_sold(self) -> bool:
        return self.buyer is not None


class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)

    products = relationship(
        "Product",
        secondary=category_product_table,
        back_populates="categories")


class Image(Base):
    __tablename__ = "image"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey('product.id'))

    # foreignKeys relationships
    product = relationship(Product, foreign_keys=[product_id])

    @hybrid_property
    def url(self) -> str:
        return "/images/{}".format(self.id)
