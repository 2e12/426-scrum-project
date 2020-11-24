from backend.database import engine
from backend.users import models
from backend.users.routes import user_router
from fastapi import FastAPI, APIRouter

app = FastAPI()
api_router = APIRouter()

models.Base.metadata.create_all(bind=engine)

api_router.include_router(
    user_router,
    prefix="/users",
    tags=["users"],
    responses={401: {"description": "Incorrect username or password"}},
)

app.include_router(
    api_router,
    prefix="/api"
)
