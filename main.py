import uvicorn
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db
from gpt_turbo_api import *

from schema import User as SchemaUser
from models import User as ModelUser
from models import Base as ModelBase

from constants import *

from database import initialize_database
# from dotenv import load_dotenv

# load_dotenv('.env')

app = FastAPI()

initialize_database(db_url, ModelBase)
app.add_middleware(DBSessionMiddleware, db_url=db_url)

@app.get("/")
async def root():
    # If database doesn't exist, create it
    return {"message": "Hello World"}

@app.post('/user/', response_model=SchemaUser)
async def create_user(user: SchemaUser):
    db_user = ModelUser(username=user.username, name=user.name, email=user.email, password=user.password)
    db.session.add(db_user)
    db.session.commit()
    return db_user

@app.get('/user/')
async def show_users():
    users = db.session.query(ModelUser).all()
    # print(users)
    return users

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)