from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, BasePermission,SAFE_METHODS
from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions


# Custom permission class
class Is_Authenticated_Or_Read_Only(IsAuthenticated):
    def has_permission(self, request, view):
        user_type = type(request.user)
        # print(user_type)
        if user_type is dict:
            return bool(request.user and request.user["is_authenticated"])
        else:
            return request.method in SAFE_METHODS
            # msg = "No Bearer Token provided."
            # raise exceptions.AuthenticationFailed(msg)

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
         return request.method in SAFE_METHODS
        # user_type = type(request.user)
        # # print(user_type)
        # if user_type is dict:
        #     return request.method in SAFE_METHODS
        # else:
        #     msg = "No Bearer Token provided."
        #     raise exceptions.AuthenticationFailed(msg)


# class IsOwner(permissions.BasePermission):

#     def has_permission(self, request, view, obj):

#         if request.method == "DELETE":

#             _id = request.parser_context.get("kwargs", {}).get("_id")
#             addedBy = request.query_params.get("userId")

#             response = Request.get({"_id": _id})

#             if response.get("userId") == addedBy:
#                 return True
#             return False

#     def has_delete_permission(self, request, obj=None):
#         return request.user.is_superuser


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):

        if request.method == "DELETE":
            return True
        return obj.userId == request.user

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser


class IsRoomUser(permissions.BasePermission):
    def has_permission(self, request, view):

        if request.user.is_staff:
            return True
        return super().has_permission(request, view)
