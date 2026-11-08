
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

### Via Docker : sans le backend

- Cloner le dépôt !
- Placez vous dans le projet.
- Construire l'image Docker : `docker build -t ng-playground-app:latest .`
- Puis lancer le conteneur.

### Via Docker : avec le backend

Dirigez-vous vers le dépôt GitHub suivant : [docker-playground-of-css/ng-spring-playground-app](https://github.com/docker-playground-of-css/ng-spring-playground-app) !

## Tour du projet

[Documentation détaillé](./docs/README.MD)

### Démonstrations techniques

- Signal
- Directive

### Jeu

- Jeu du bâtonnets

### Application

- Jours fériés français (Work In Progress)
- Gestionnaire rudimentaire de tâches

[Plus de détails sur les applications](./docs/sub-app/README.MD)
