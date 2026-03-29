
# Terrain de jeu Angular

## Introduction

Ce dépôt existe pour tester les fonctionnalités d'Angular 19 !

Vous trouverez notamment une implémentation du jeu du bâtonnet et autres démonstrations techniques.

## Mode d'emploi

Remarque : nécessite NodeJS et NPM pour suivre le mode opératoire.

- Récupérer les sources.
- Placez-vous à la racine du projet.
- Installer les dépendances : `npm install`.
- Et enfin, lancer le projet : `ng serve`.

Dans la partie suivante vous avez quelques explications pour déployer l'application dans Docker.

## Déploiement

### Via Docker

- Cloner le dépôt !
- Placez vous dans le projet.
- Construire l'image Docker : `docker build -t ng-playground-app:latest .`
- Puis créer le conteneur (s'il s'agit du premier lancement) : `docker run -d --name ng-playground-app -p 8019:80 ng-playground-app:latest`, sinon lancer le conteneur via Docker.

## Tour du projet

[Documentation détaillé](./docs/README.MD)

### Démonstrations techniques

- Signal
- Directive

### Jeu

- Jeu du bâtonnets

### Application

- Jours fériés français (Work In Progress)
- Bibliothèque de jeux vidéos (Work In Progress)

[Plus de détails sur les applications](./docs/sub-app/README.MD)
