from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions
import requests


# #Custom permission class
# class Is_Authenticated(IsAuthenticated):

#     def has_permission(self, request, view):
#         return bool(request.user and request.user["is_authenticated"])

# Custom token authentication
class Zuri_Token_Auth(authentication.TokenAuthentication):

    keyword = "Bearer"

    # Token verification
    def verifyToken(self, token):

        url = "https://api.zuri.chat/auth/verify-token"
        b = "Bearer " + token
        headers = {"Authorization": b}
        # print(headers)
        res = requests.get(url, headers=headers)

        data = res.json()
        if res.status_code == 200:
            if data["data"]["is_verified"]:

                user = data["data"]["user"]
                user["is_authenticated"] = True

                return (user, token)

        else:
            # print(res)
            msg = "Invalid or expired token header. Login again."
            raise exceptions.AuthenticationFailed(msg)

    def authenticate(self, request):

        auth = request.META.get("HTTP_AUTHORIZATION", b"").split()

        if not auth or auth[0].lower() != self.keyword.lower():
            return None

        if len(auth) == 1:
            msg = "Invalid token header. No credentials provided."
            raise exceptions.AuthenticationFailed(msg)

        elif len(auth) > 2:
            msg = "Invalid token header."
            raise exceptions.AuthenticationFailed(msg)

        return self.verifyToken(auth[1])
