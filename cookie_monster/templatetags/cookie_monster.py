from django import template

from cookie_monster.settings import COOKIE_MONSTER_BASE_CONFIG, COOKIE_MONSTER_GROUP_CONFIG, COOKIE_GROUP_WARNING

register = template.Library()


@register.inclusion_tag('cookie_monster/base.html', takes_context=True)
def cookie_base(context):
    context['COOKIE_BASE'] = COOKIE_MONSTER_BASE_CONFIG
    return context


@register.inclusion_tag('cookie_monster/group.html', takes_context=True)
def cookie_group(context):
    context['COOKIE_BASE'] = COOKIE_MONSTER_BASE_CONFIG
    context['COOKIE_GROUP'] = COOKIE_MONSTER_GROUP_CONFIG
    context['COOKIE_GROUP_WARNING'] = COOKIE_GROUP_WARNING
    return context
