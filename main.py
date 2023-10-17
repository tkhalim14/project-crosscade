import uvicorn
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db
from gpt_turbo_api import *

from schema import User as SchemaUser
from models import User as ModelUser

import os
from dotenv import load_dotenv

load_dotenv('.env')

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post('/user/', response_model=SchemaUser)
async def create_user(user: SchemaUser):
    db_user = ModelUser(username=user.username, name=user.name, email=user.email, password=user.password)
    db.session.add(db_user)
    db.session.commit()
    return db_user

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)