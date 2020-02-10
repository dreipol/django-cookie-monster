import json

from django import template
from django.utils.safestring import mark_safe

from cookie_monster.settings import COOKIE_MONSTER_BASE_CONFIG, COOKIE_MONSTER_CUSTOM_THEME, COOKIE_MONSTER_GROUPS
from cookie_monster.utils import LazyEncoder

register = template.Library()


@register.inclusion_tag('cookie_monster/base.html', takes_context=True)
def cookie_monster(context):
    context['cookie_monster'] = COOKIE_MONSTER_BASE_CONFIG
    context['cookie_monster_custom_theme'] = COOKIE_MONSTER_CUSTOM_THEME
    context['cookie_monster_groups'] = mark_safe(json.dumps(COOKIE_MONSTER_GROUPS, cls=LazyEncoder))
    return context
