from backend.database import engine
from backend.users import models as user_models
from backend.products import models as product_models
from backend.users.routes import user_router
from backend.products.routes import product_router
from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:8100",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



api_router = APIRouter()

user_models.Base.metadata.create_all(bind=engine)
product_models.Base.metadata.create_all(bind=engine)

api_router.include_router(
    user_router,
    prefix="/users",
    tags=["users"],
    responses={401: {"description": "Incorrect username or password"}},
)

api_router.include_router(
    product_router,
    prefix='/products',
    tags=["products"],
    responses={404: {'description': 'Products not found'}}

)

app.include_router(
    api_router,
    prefix="/api"
)
