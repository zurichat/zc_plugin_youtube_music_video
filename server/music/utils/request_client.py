from __future__ import annotations

import json
from collections.abc import MutableMapping
from typing import Any

import requests
from requests import RequestException


class APIConnectionError(Exception):
    def __init__(self, response_code: int, response_data: dict[str, Any]):
        """Set response code and response data."""
        self.response_code = response_code
        self.response_data = response_data
        super().__init__("APIConnectionError")


class Response:
    """Data class for response third party request response."""

    def __init__(self, response_data, status_code, headers):
        """Set data."""
        self.response_data = response_data
        self.status_code = status_code
        self.headers = headers


class RequestClient:
    """Requests wrapper library used to handle HTTP requests to third party libraries."""

    _conn_timeout = 15
    _read_timeout = 45

    def __init__(
        self, conn_timeout: int | None = None, read_timeout: int | None = None
    ):
        """Third party name and timeout if set."""
        self._conn_timeout = conn_timeout or self._conn_timeout
        self._read_timeout = read_timeout or self._read_timeout

    def request(
        self,
        method,
        url,
        headers,
        params: MutableMapping[str, str] | None = None,
        post_data: dict[str, Any] | None = None,
        verify=True,
    ):
        """
        Perform request to third party endpoints.
        :param verify:
        :param params:
        :param method:
        :param url:
        :param headers:
        :param post_data:
        :return: Response object with request code and response data.
        """

        if post_data is None:
            post_data = {}

        request_data = json.dumps(post_data)

        try:
            response = requests.request(
                method,
                url,
                headers=headers,
                data=request_data,
                timeout=(self._conn_timeout, self._read_timeout),
                params=params,
                verify=verify,
            )
            status_code = response.status_code

            try:
                response_data = response.json()
            except json.JSONDecodeError:
                response_data = {}

            headers = response.headers

            return Response(
                response_data=response_data, headers=headers, status_code=status_code
            )

        except RequestException as exception:
            raise APIConnectionError(
                response_code=exception.response.status_code
                if exception.response
                else 0,
                response_data={"message": str(exception)},
            ) from exception