from rest_framework import permissions


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        if request.method == "DELETE":
            return True
        return obj.addedBy == request.user

    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser


class IsOwner2(permissions.BasePermission):

    def has_permission(self, request, view, obj):

        if request.method == "DELETE":

            _id = request.parser_context.get("kwargs", {}).get("_id")
            addedBy = request.query_params.get("user")

            response = Request.get({"_id": _id})

            if response.get("user") == addedBy:
                return True
            return False

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser