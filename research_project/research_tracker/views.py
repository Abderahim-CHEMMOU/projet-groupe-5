# research_tracker/views.py

from rest_framework import viewsets
from .models import Chercheur, ProjetDeRecherche, Publication
from .serializers import ChercheurSerializer, ProjetDeRechercheSerializer, PublicationSerializer

class ChercheurViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows chercheurs to be viewed or edited.
    """
    queryset = Chercheur.objects.all()
    serializer_class = ChercheurSerializer

class ProjetDeRechercheViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows projets de recherche to be viewed or edited.
    """
    queryset = ProjetDeRecherche.objects.all()
    serializer_class = ProjetDeRechercheSerializer

class PublicationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows publications to be viewed or edited.
    """
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
