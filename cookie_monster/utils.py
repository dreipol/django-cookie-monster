import importlib


def get_callable(callable_str):
    module_name, object_name = callable_str.rsplit('.', 1)
    module = importlib.import_module(module_name)
    return getattr(module, object_name)
