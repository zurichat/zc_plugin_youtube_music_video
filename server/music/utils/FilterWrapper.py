import json
from copy import copy


class OrderMixin:
    """
        mixin for applying ordering to List endpoints
    """

    """
        PARAMETER
        OrderingFields: { "timestamp"; datetime.fromisoformat} 
    """

    Query = "order_by"
    Dquery = "ascending"
    OrderingFields = {}  # contains allowed ordering fields

    Queryset = []

    def _get_queryset(self):
        return getattr(self, "Queryset", [])

    def _clean_query_params(self, request):
        """
            This  method is used to remove the ordering query params
            so as to avoid sending them as filters to zc-core
        """
        params = dict(request.query_params)
        params.pop(self.Query, None)
        params.pop(self.Dquery, None)
        return params

    def parse_field_to_path(self, key):
        return key.split("__")

    def _get_value(self, obj: dict, path: list, converter=None):
        temp = copy(obj)
        value = None

        for param in path:
            try:
                value = temp.get(param)
            except:
                value = None
                break
            else:
                temp = value

        if converter:

            try:
                value = converter(value)
            except:
                pass

        return value

    def partition(self, path: list, converter, array: list, low: int, high: int):
        pivot = self._get_value(array[high], path, converter)

        i = low - 1

        for j in range(low, high):
            try:
                if self._get_value(array[j], path, converter) <= pivot:
                    i = i + 1

                    (array[i], array[j]) = (array[j], array[i])
            except TypeError:
                pass
        (array[i + 1], array[high]) = (array[high], array[i + 1])
        return i + 1

    def quick_sort(self, path: list, converter: None, array: list, low: int, high: int):
        if low < high:
            pi = self.partition(path, converter, array, low, high)
            self.quick_sort(path, converter, array, low, pi - 1)
            self.quick_sort(path, converter, array, pi + 1, high)

    def _order_queryset(self, by: str, ascending=True) -> list:
        queryset = copy(self._get_queryset())
        assert (type(by) == str), " 'by'  must be of type string"
        assert by in self.OrderingFields.keys(), "can not perform order by this key as it is not in the ordering fields"
        converter = self.OrderingFields.get(by)
        path = self.parse_field_to_path(by)
        self.quick_sort(path, converter, queryset, 0, len(queryset) - 1)
        print(queryset)
        return queryset if ascending else queryset[::-1]

    def perform_ordering(self, request, payload: list):
        by = request.query_params.get(self.Query, None)
        direction = json.loads(request.query_params.get(self.Dquery, "true"))
        self.Queryset = payload
        if by:
            try:
                return self._order_queryset(by, direction)
            except:
                pass
        return payload