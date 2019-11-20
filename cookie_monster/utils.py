import importlib


def get_callable(string_or_callable):
    """
    If given a callable then it returns it, otherwise it resolves the path
    and returns an object.
    """
    if callable(string_or_callable):
        return string_or_callable
    else:
        module_name, object_name = string_or_callable.rsplit('.', 1)
        module = importlib.import_module(module_name)
        return getattr(module, object_name)
