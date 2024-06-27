
# Projet Django avec Django REST Framework (DRF)

Ce projet est un exemple d'application Django utilisant Django REST Framework (DRF) pour créer une API RESTful. L'API gère des chercheurs, des projets de recherche et des publications. La documentation de l'API est disponible via Swagger.

## Prérequis

Assurez-vous que les éléments suivants sont installés sur votre système :
- Python 3.8+
- pip (gestionnaire de paquets pour Python)
- virtualenv (optionnel mais recommandé)
- MySQL (si vous utilisez MySQL comme base de données)

## Installation

### 1. Cloner le Dépôt

Clonez le dépôt GitHub de votre projet sur votre machine locale.

```bash
git clone git@github.com:Abderahim-CHEMMOU/projet-groupe-5.git
cd research_project
```

2. Créer et Activer un Environnement Virtuel
Créez un environnement virtuel pour isoler les dépendances du projet.

```bash
python3 -m venv venv
source venv/bin/activate  # Sur Windows, utilisez `venv\Scripts\activate`
```

3. Installer les Dépendances
Installez les dépendances nécessaires depuis le fichier requirements.txt.

```bash
pip install -r requirements.txt 
```
4. Configurer la Base de Données j'ai Utilisé Sqlite3
Si vous utilisez MySQL, assurez-vous que le serveur MySQL est en cours d'exécution et créez une base de données pour votre projet.

Exemple de configuration MySQL dans settings.py :
python
Copier le code
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'nom_de_votre_base_de_donnees',
        'USER': 'votre_utilisateur_mysql',
        'PASSWORD': 'votre_mot_de_passe_mysql',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
5. Appliquer les Migrations
Appliquez les migrations pour configurer votre base de données.

```bash
python3 manage.py migrate
```

6. Créer un Superutilisateur
Créez un compte superutilisateur pour accéder à l'interface d'administration de Django.

```bash

python3 manage.py createsuperuser
```
7. Démarrer le Serveur de Développement
Démarrez le serveur de développement Django.

```bash
python3 manage.py runserver
```
Accédez à l'application à l'adresse http://127.0.0.1:8000/tracker/.

Accéder à l'API DRF
L'API Django REST Framework est accessible via l'URL http://127.0.0.1:8000/tracker/. Vous 

Documentation de l'API avec Swagger
La documentation de l'API est disponible via Swagger à l'adresse http://127.0.0.1:8000/swagger/.  

Vous pouvez tester avec:

 - l'API REST sur le navigateur en tapant ces urls
   http://127.0.0.1:8000/tracker/
   http://127.0.0.1:8000/tracker/chercheurs/
   http://127.0.0.1:8000/tracker/projets/
   http://127.0.0.1:8000/tracker/publications/

  
 - le fichier test.http il faut installer l'exention vsCode "REST Client"

 - Avec Swagger qui repérensete la Doc








