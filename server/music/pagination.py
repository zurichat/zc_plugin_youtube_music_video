from typing import OrderedDict

from rest_framework import pagination
from rest_framework.response import Response


class SearchPagination(pagination.PageNumberPagination):
    def get_last_page(self, count, size):
        if size > count:
            return 1
        return count // size

    def get_paginated_response(self, data, query, filters, request, entity_type=""):
        pagination_data = OrderedDict(
            [
                ("total_results", self.page.paginator.count),
                ("page_size", len(data)),
                ("current_page", self.get_page_number(request, self.page.paginator)),
                ("first_page", 1),
                (
                    "last_page",
                    self.get_last_page(
                        self.page.paginator.count, self.get_page_size(request)
                    ),
                ),
                ("next", self.get_next_link()),
                ("previous", self.get_previous_link()),
            ]
        )

        search_parameters = OrderedDict(
            [
                ("query", query),
                ("filter", filters),
                ("plugin", "Music"),
            ]
        )

        results = OrderedDict([("entity", entity_type), ("data", (data))])

        return Response(
            OrderedDict(
                [
                    ("status", "ok"),
                    ("title", "Music Plugin Search"),
                    ("description", f"Search Results for {query} in Music Plugin"),
                    ("pagination", pagination_data),
                    ("search_parameters", search_parameters),
                    ("results", results),
                ]
            )
        )
