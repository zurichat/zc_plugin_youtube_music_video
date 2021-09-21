import requests
from rest_framework import status


def user_auth(email, password):


    data = {"email":email, "password":password}
   
    res = requests.post("https://api.zuri.chat/auth/login", json=data)
    json_data = res.json()
        
    data = json_data["data"]
    user = data["user"]
    user_token = user["token"]
     
    return user_token


def verify_token(token):

    url  = "https://api.zuri.chat/auth/verify-token"

    token = 'Bearer ' + token

    headers = {'Authorization': token}

    res = requests.post(url, headers=headers)

    data = res.json()

    verified = data['data']['is_verified']

    if not verified:

        return ({"message":"Token not verified"}, status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

    else:

        return ({"message":"Token verified"}, status.HTTP_200_OK)