=====
Usage
=====

To use django-cookie-monster in a project, add it to your `INSTALLED_APPS`:

.. code-block:: python

    INSTALLED_APPS = (
        ...
        'cookie_monster.apps.CookieMonsterConfig',
        ...
    )

Add django-cookie-monster's URL patterns:

.. code-block:: python

    from cookie_monster import urls as cookie_monster_urls


    urlpatterns = [
        ...
        url(r'^', include(cookie_monster_urls)),
        ...
    ]
