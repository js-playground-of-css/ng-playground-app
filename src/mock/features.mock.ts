import { Feature } from "../model/feature.model";

export const FEATURE_LIST: Feature[] = [
    {
        id: 1,
        title: 'Signal : exemple d\'un inventaire',
        path: 'src/app/inventory-counter/inventory-counter.component.ts',
        type: 'technique',
        url: 'inventaire/compteur'
    },
    {
        id: 2,
        title: 'Directive : couleur de bordure en fonction d\'un paramètre',
        path: 'src/app/directive/feature-border.directive.ts',
        type: 'technique',
        url: 'home'
    },
    {
        id: 33,
        title: 'Jeu du bâtonnets',
        path: 'src/app/games/batonnets',
        type: 'jeu',
        url: 'games/batonnets'
    },
    {
        id: 42,
        title: 'Jours fériés français',
        path: 'src/app/sub-app/jours-feries-fr',
        type: 'app',
        url: 'sub-app/jours-feries-fr'
    },
    {
        id: 79,
        title: 'Bibliothèque jeux vidéos',
        path: 'src/app/sub-app/jv-info/jv-auth-page',
        type: 'app',
        url: 'sub-app/jv-info/auth'
    }
];