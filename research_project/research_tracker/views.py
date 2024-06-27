# research_tracker/views.py
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .models import Chercheur, ProjetDeRecherche, Publication
from .serializers import ChercheurSerializer, ProjetDeRechercheSerializer, PublicationSerializer
from .filters import ChercheurFilter, ProjetDeRechercheFilter, PublicationFilter

class ChercheurViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows chercheurs to be viewed or edited.
    """
    queryset = Chercheur.objects.all()
    serializer_class = ChercheurSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ChercheurFilter

class ProjetDeRechercheViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows projets de recherche to be viewed or edited.
    """
    queryset = ProjetDeRecherche.objects.all()
    serializer_class = ProjetDeRechercheSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjetDeRechercheFilter

class PublicationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows publications to be viewed or edited.
    """
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PublicationFilter
