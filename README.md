# django-cookie-monster

[![CircleCI](https://circleci.com/gh/dreipol/django-cookie-monster.svg?style=svg)](https://circleci.com/gh/dreipol/django-cookie-monster)
[![Maintainability](https://api.codeclimate.com/v1/badges/3032662f751343e49710/maintainability)](https://codeclimate.com/github/dreipol/django-cookie-monster/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/dreipol/django-cookie-monster/badge.svg?branch=develop)](https://coveralls.io/github/dreipol/django-cookie-monster?branch=develop)

This package gives you two versions of a cookie banner. The simple one is basically just a hint to inform users 
that you are using cookies. The group version let's your users decide which cookies he needs.

Quickstart
----------

Install django-cookie-monster::

    pip install django-cookie-monster

Add it to your `INSTALLED_APPS`:

```
INSTALLED_APPS = (
    ...
    'cookie_monster',
    ...
)
```

Add a type and data property to all script tags that store any cookies.
```html
<!-- before -->
<script>// This is my script</script>

<!-- after -->
<script type="text/plain" data-cookieconsent="the_ID_of_my_group">// This is my script</script>
```

Settings
--------

Overwrite strings in your settings file. You will find a complete reference below.  

```python
COOKIE_MONSTER = {
    'banner': {
        'title': 'My Cookie Banner Title',
    }
}
```

To switch from standard to group mode you need to specify a list of setting groups.

```python
COOKIE_MONSTER = {
    'cookie_groups': {
        'rows': [
            'Name',
            'Provider',
            'Purpose',
        ],
        'groups': [
            {
                'title': 'Necessary',
                'required': True,
                'cookies': [
                    {
                        'id': 'application',
                        'rows': [
                            'Language',
                            'example.com',
                            'site language',
                        ],
                    },
                ],
            },
            {
                'title': 'Marketing',
                'required': False,
                'cookies': [
                    {
                        'id': 'GTM',
                        'rows': [
                            'Google Tag Manager',
                            'Google.com',
                            'tracking cookie',
                        ],
                    },
                ],
            },
        ],
    },
}
```


This is an example of a fully customised version of a cookie banner:

```python
COOKIE_MONSTER = {
    'banner': {
        'title': 'My Cookie Banner Title',
        'text': 'This is my custom text with a dynamic <a href="https://example.com/">link</a> to another page.',
        'policy_link': 'contents.utils.my_callable_that_returns_a_dynamic_link_to_the_privacy_page',
        'buttons': {
            'confirm': {'label': 'Accept all cookies'},
            'toggle': {'label': 'Toggle settings'},
            'accept_all_cookies': {'label': 'Accept all Cookies'},
            'accept_all_group_cookies': {'label': 'Accept {groupTitle} Cookies'}
        },
    },
    'accordion_title': '{groupTitle} ({amount})',
    'custom_theme': True,
    'cookie_groups': {
        'rows': [
            'Name',
            'Provider',
            'Purpose',
        ],
        'groups': [
            {
                'title': 'Necessary',
                'required': True,
                'cookies': [
                    {
                        'id': 'application',
                        'rows': [
                            'Language',
                            'example.com',
                            'site language',
                        ],
                    },
                ],
            },
            {
                'title': 'Marketing',
                'required': False,
                'cookies': [
                    {
                        'id': 'GTM',
                        'rows': [
                            'Google Tag Manager',
                            'Google.com',
                            'tracking cookie',
                        ],
                    },
                ],
            },
        ],
    },
}
```

# Contribute

## Installation

To install the frontend you will need to run:

```sh
npm i
```

## Building frontend

The frontend can be built via:

```sh
npm run build
```

## Unit test

You can unit test the frontend code with:

```sh
npm test
```

