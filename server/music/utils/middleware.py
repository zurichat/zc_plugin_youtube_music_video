import logging


class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):  # noqa
        view_exceptions = ["render_react", "schemaview"]
        # user_token = request.GET.get("user_token")
        if view_func.__name__.lower() in view_exceptions:
            return
        # print(user_token)
        # Process user token from zc_core & raise exception if
        # the user isnt authenticated
        # return JsonResponse({"msg": "user not authenticated"})


class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if response:
            response = self.process_response(request, response)
            logging.info(f"Response (production) - {response.__dict__['_headers']}")
        return response

    def process_response(self, request, response):
        if request.method.upper() in ["GET", "POST", "PUT", "DELETE "]:
            try:
                del response.__dict__["_headers"]["access-control-allow-origin"]
            except:  # noqa
                pass

        # else:
        #     response.__dict__["_headers"]["access-control-allow-origin"] = (
        #         "Access-Control-Allow-Origin",
        #         "*",
        #     )
        #     response.__dict__["_headers"]["content-type"] = (
        #         "Content-Type",
        #         "text/plain",
        #     )

        return response