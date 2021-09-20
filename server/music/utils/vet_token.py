import requests
from rest_framework import status



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