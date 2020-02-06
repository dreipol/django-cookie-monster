import importlib
import json

from django import template
from django.utils.safestring import mark_safe

from cookie_monster.settings import COOKIE_MONSTER_BASE_CONFIG, COOKIE_MONSTER_GROUP_CONFIG, COOKIE_GROUP_WARNING, \
    COOKIE_MONSTER_CUSTOM_THEME
from cookie_monster.utils import get_callable

register = template.Library()


@register.inclusion_tag('cookie_monster/base.html', takes_context=True)
def cookie_base(context):
    context['COOKIE_BASE'] = COOKIE_MONSTER_BASE_CONFIG
    context['COOKIE_CUSTOM_THEME'] = COOKIE_MONSTER_CUSTOM_THEME
    context['COOKIE_GROUP'] = mark_safe(json.dumps(COOKIE_MONSTER_GROUP_CONFIG))
    return context


@register.simple_tag(takes_context=True)
def get_cookie_policy_url(context):
    href_callable = COOKIE_MONSTER_BASE_CONFIG['cookie_policy']['href_callable']
    return get_callable(href_callable)(context['request'])
