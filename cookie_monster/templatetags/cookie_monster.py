import json
from django import template
from django.utils.safestring import mark_safe

from cookie_monster.settings import get_base_config, get_settings_variable
from cookie_monster.utils import LazyEncoder

register = template.Library()


@register.inclusion_tag('cookie_monster/base.html', takes_context=True)
def cookie_monster(context):
    cookie_monster_groups = get_settings_variable(['cookie_groups'], [])

    context['cookie_monster'] = get_base_config()
    context['cookie_monster_custom_theme'] = get_settings_variable(['custom_theme'], False)
    context['cookie_monster_groups'] = mark_safe(json.dumps(cookie_monster_groups, cls=LazyEncoder))
    return context
