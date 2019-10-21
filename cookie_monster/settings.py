from django.conf import settings
from django.utils.translation import ugettext_lazy as _

COOKIE_MONSTER = getattr(settings, 'COOKIE_MONSTER')
COOKIE_GROUP_WARNING = _('Please set the cookie_group configuration in your settings.py')


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
        else:
            return obj[current_key]
    else:
        return default


COOKIE_MONSTER_BASE_CONFIG = {
    'cookie_identifier': get_settings_variable(['cookie', 'identifier'], _('cookie_consent')),
    'cookie_age': get_settings_variable(['cookie', 'age'], 604800),
    'banner_title': get_settings_variable(['banner', 'title'], _('Cookie Banner')),
    'banner_text': get_settings_variable(['banner', 'text'],
                                         _('This website uses cookies to provide you with an optimal user experience.')),
    'cookie_policy': {
        'help_text': get_settings_variable(['banner', 'cookie_policy', 'text'], _('For more information read our')),
        'href': get_settings_variable(['banner', 'cookie_policy', 'href'], _('')),
        'label': get_settings_variable(['banner', 'cookie_policy', 'label'], _('Cookie Police')),
    },
    'button_labels': {
        'cookie_base_button_label': get_settings_variable(['banner', 'buttons', 'base_button'], _('Confirm')),
        'cookie_group_set_all_button_label': get_settings_variable(['banner', 'buttons', 'group_buttons', 'set_all_button'],
                                                                   _('Confirm all')),
        'cookie_group_set_choice_button_label': get_settings_variable(['banner', 'buttons', 'group_buttons', 'set_choice_button'],
                                                                      _('Confirm selection')),
    },
}

COOKIE_MONSTER_CUSTOM_THEME = get_settings_variable(['banner', 'custom_theme'], True)
COOKIE_MONSTER_GROUP_CONFIG = get_settings_variable(['cookie_group'], [])

