# research_tracker/filters.py

import django_filters
from .models import Chercheur, ProjetDeRecherche, Publication

class ChercheurFilter(django_filters.FilterSet):
    class Meta:
        model = Chercheur
        fields = ['nom', 'specialite']

class ProjetDeRechercheFilter(django_filters.FilterSet):
    class Meta:
        model = ProjetDeRecherche
        fields = ['titre', 'chef_de_projet', 'chercheurs', 'date_debut', 'date_fin_prevue']

class PublicationFilter(django_filters.FilterSet):
    class Meta:
        model = Publication
        fields = ['titre', 'projet', 'date_publication']
