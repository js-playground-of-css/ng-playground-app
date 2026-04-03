# --- Étape 1 : Clonage et Build ---
FROM node:20-alpine AS build
WORKDIR /app

ARG APP_VERSION=v1.1.1

# Installation de git
RUN apk add --no-cache git

# Clonage du dépôt
RUN git clone --branch ${APP_VERSION} --depth 1 https://github.com/js-playground-of-css/ng-playground-app.git .

# Installation et Build
RUN npm install
RUN npm run build -- --configuration production

# --- Étape 2 : Image Finale ---
FROM almalinux:9-minimal

RUN microdnf install -y nginx && \
    microdnf clean all

# COPIER la configuration du serveur web
COPY nginx.conf /etc/nginx/conf.d/angular.conf

# On récupère le résultat du build de l'étape précédente
COPY --from=build /app/dist/ng-playground-app/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]