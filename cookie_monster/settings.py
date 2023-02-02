import six
from django.conf import settings
from django.utils.functional import lazy
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

from cookie_monster.utils import get_callable

COOKIE_MONSTER = getattr(settings, 'COOKIE_MONSTER')


def get_settings_variable(nested_keys, default, obj=COOKIE_MONSTER):
    """
    :param nested_keys: an array of keys
    :param default: the fallback value
    :param obj: the object
    """
    try:
        current_key = nested_keys.pop(0)
    except IndexError:
        return default

    if current_key in obj:
        if nested_keys:
            return get_settings_variable(nested_keys=nested_keys, default=default, obj=obj[current_key])
        return obj[current_key]
    return default


COOKIE_MONSTER_BASE_CONFIG = {
    'banner': {
        'title': get_settings_variable(['banner', 'title'], _('Cookie Banner')),
        'text': get_settings_variable(['banner', 'text'], _('This website uses cookies to provide you with an optimal '
                                                            'user experience.')),
    },
    'cookie': {
        'identifier': get_settings_variable(['cookie', 'identifier'], _('cookie_consent')),
        'age': get_settings_variable(['cookie', 'age'], 604800),
        'samesite': get_settings_variable(['cookie', 'samesite'], 'Lax'),
    },
    'accordion_title': get_settings_variable(['accordion_title'], _('{groupTitle} ({amount})')),
    'buttons': {
        'confirm': {
            'label': get_settings_variable(['banner', 'buttons', 'confirm', 'label'], _('Accept all cookies')),
        },
        'toggle': {
            'label': get_settings_variable(['banner', 'buttons', 'toggle', 'label'], _('Toggle settings')),
        },
        'accept_all_cookies': {
            'label': get_settings_variable(['banner', 'buttons', 'accept_all_cookies', 'label'],
                                           _('Accept all cookies')),
        },
        'accept_all_group_cookies': {
            'label': get_settings_variable(['banner', 'buttons', 'accept_all_group_cookies', 'label'],
                                           _('Accept {groupTitle} cookies')),
        },
    },
}

COOKIE_MONSTER_CUSTOM_THEME = get_settings_variable(['custom_theme'], False)
COOKIE_MONSTER_GROUPS = get_settings_variable(['cookie_groups'], [])
