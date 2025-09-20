from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_and_login():
    res = client.post("/register", params={"username":"testuser","password":"testpass"})
    assert res.status_code == 200

    res = client.post("/token", data={"username":"testuser","password":"testpass"})
    assert res.status_code == 200
    assert "access_token" in res.json()
