from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/cookie/set/{name}/{value}/")
async def set_cookie(name: str, value: str, response: Response):
    response.set_cookie(key=name, value=value, secure=False)
    return {"status": "ok"}


@app.get("/cookie/get/{name}/")
async def get_cookie(request: Request, name: str):
    return {"value": request.cookies.get(name)}


def test_cookie_flow():
    from fastapi.testclient import TestClient

    with TestClient(app) as client:
        # Set cookie
        response = client.get("/cookie/set/test/value123/")
        assert response.status_code == 200

        # Verify cookie is set
        assert "test" in client.cookies
        assert client.cookies["test"] == "value123"

        # Get cookie
        response = client.get("/cookie/get/test/")
        assert response.json()["value"] == "value123"


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
