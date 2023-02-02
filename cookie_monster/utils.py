import importlib

from django.core.serializers.json import DjangoJSONEncoder
from django.utils.encoding import force_str
from django.utils.functional import Promise


class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Promise):
            return force_str(obj)
        return super(LazyEncoder, self).default(obj)


def get_callable(callable_str):
    module_name, object_name = callable_str.rsplit('.', 1)
    module = importlib.import_module(module_name)
    return getattr(module, object_name)
