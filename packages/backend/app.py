from fastapi import FastAPI, Request, HTTPException, Depends, Response, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import psycopg2
from dotenv import load_dotenv
from backend.constants import ENV_PATH
import os
from backend.models import (
    PingLocationRequest
)
import backend.db as db
from firebase_admin import credentials, initialize_app, auth

load_dotenv(dotenv_path=ENV_PATH)

def get_conn():
    return psycopg2.connect(
        host=os.environ["DB_HOST"],
        database=os.environ["DB_DATABASE"],
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"]
    )

cred = credentials.Certificate(
    {
        "type": "service_account",
        "project_id": os.environ["FIREBASE_PROJECT_ID"],
        "private_key": os.environ["FIREBASE_AUTH_SECRET"].replace("\\n", "\n"),
        "client_email": os.environ["FIREBASE_CLIENT_EMAIL"],
        "token_uri": "https://oauth2.googleapis.com/token",
    }
)
initialize_app(cred)

conn = get_conn()
print("Initializing database")
db.init_db(conn)
conn.close()
print("Database initialized successfully")

app = FastAPI()

def get_user_token(res: Response, credential: HTTPAuthorizationCredentials=Depends(HTTPBearer(auto_error=False))):
    if cred is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Bearer authentication is needed",
            headers={'WWW-Authenticate': 'Bearer realm="auth_required"'},
        )
    try:
        decoded_token = auth.verify_id_token(credential.credentials)
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication from Firebase. {err}",
            headers={'WWW-Authenticate': 'Bearer error="invalid_token"'},
        )
    res.headers['WWW-Authenticate'] = 'Bearer realm="auth_required"'
    return decoded_token

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/ping_location/")
async def ping_location(location: PingLocationRequest, user_id = Depends(get_user_token)):
    print(location, user_id)
    if location.userid != user_id["uid"]:
        raise HTTPException(status_code=401, detail='Invalid authorization token. Userid does not match.')
    conn = get_conn()
    db.update_geom(conn, location.latitude, location.longitude, location.userid, location.groupid)
    conn.close()
    return {"message": "Location updated successfully"}

# Write a fastapi get method that takes in a groupid and returns the geometry of all users in that group
@app.get("/get_group_geom/{groupid}")
async def get_group_geom(groupid: str): 
    conn = get_conn()
    result = db.get_group_geom(conn, groupid)
    conn.close()
    return result
