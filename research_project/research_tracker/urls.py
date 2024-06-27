# research_tracker/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChercheurViewSet, ProjetDeRechercheViewSet, PublicationViewSet



router = DefaultRouter()
router.register(r'chercheurs', ChercheurViewSet)
router.register(r'projets', ProjetDeRechercheViewSet)
router.register(r'publications', PublicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
