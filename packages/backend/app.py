from fastapi import FastAPI
import psycopg2
from psycopg2 import pool
from dotenv import load_dotenv
from backend.constants import ENV_PATH
import os
from backend.models import (
    PingLocationRequest
)
import backend.db as db

load_dotenv(dotenv_path=ENV_PATH)

connection_pool = psycopg2.pool.SimpleConnectionPool(
    minconn=1,
    maxconn=5,
    host=os.environ["DB_HOST"],
    database=os.environ["DB_DATABASE"],
    user=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"]
)

with connection_pool.getconn() as conn:
    print("Initializing database")
    db.init_db(conn)
    print("Database initialized successfully")

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/ping_location/")
async def ping_location(location: PingLocationRequest):
    print(location)
    with connection_pool.getconn() as conn:
        db.update_geom(conn, location.latitude, location.longitude, location.userid, location.groupid)
    return {"message": "Location updated successfully"}