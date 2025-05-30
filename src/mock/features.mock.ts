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
        path: './',
        type: 'jeu',
        url: 'games/batonnets'
    }
];