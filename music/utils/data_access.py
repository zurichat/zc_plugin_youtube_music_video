from music.utils.request_client import RequestClient


def user_login():
    payload = {"email": "hng.user01@gmail.com", "password": "password"}

    request_client = RequestClient()

    response = request_client.request(
        method="POST",
        url="https://api.zuri.chat/auth/login",
        headers={"Content-Type": "application/json"},
        post_data=payload,
    )
    return response


def verify_token():
    headers = {
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
        "eyJhdXRob3JpemVkIjp0cnVlLCJVc2VyIjp7ImlkIjoiN"
        "jEzNTkwZmQwMzY2YjY4MTZhMGI3NWVlIiwiZW1haWwiOiJ"
        "obmcudXNlcjAxQGdtYWlsLmNvbSJ9LCJleHAiOjE2MzEyND"
        "E1OTIsImlzcyI6ImFwaS56dXJpLmNoYXQifQ.XZPFXTTdIBL"
        "GlMSRi_3nziOXYFOidCWFiPsMIxdy2Y0"
    }

    request_client = RequestClient()

    response = request_client.request(
        method="GET",
        url="https://api.zuri.chat/auth/verify-token",
        headers={"Authorization": headers},
    )
    return response
