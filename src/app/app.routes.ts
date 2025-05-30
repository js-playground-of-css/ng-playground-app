import { Routes } from '@angular/router';
import { InventoryCounterComponent } from './inventory-counter/inventory-counter.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BoardBatonnetsComponent } from './games/batonnets/board-batonnets/board-batonnets.component';

export const routes: Routes = [
	{ path: 'home', title: 'Accueil', component: HomepageComponent },
	{ path: 'inventaire/compteur', title: 'Signal : exemple inventaire', component: InventoryCounterComponent },
	{ path: 'games/batonnets', title: 'Jeu du bâtonnets', component: BoardBatonnetsComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' }
];
