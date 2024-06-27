# research_tracker/serializers.py

from rest_framework import serializers
from .models import Chercheur, ProjetDeRecherche, Publication

class ChercheurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chercheur
        fields = '__all__'

class ProjetDeRechercheSerializer(serializers.ModelSerializer):
    chef_de_projet = ChercheurSerializer()
    chercheurs = ChercheurSerializer(many=True)

    class Meta:
        model = ProjetDeRecherche
        fields = '__all__'

class ProjetDeRechercheWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjetDeRecherche
        fields = '__all__'

class PublicationSerializer(serializers.ModelSerializer):
    projet = ProjetDeRechercheSerializer()

    class Meta:
        model = Publication
        fields = '__all__'

class PublicationWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'
