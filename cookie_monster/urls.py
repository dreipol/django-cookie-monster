from django.conf.urls import path
from django.views.generic import TemplateView


app_name = 'cookie_monster'
urlpatterns = [
    path('', TemplateView.as_view(template_name="base.html")),
]
