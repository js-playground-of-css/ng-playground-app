import { Routes } from '@angular/router';
import { InventoryCounterComponent } from './inventory-counter/inventory-counter.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BoardBatonnetsComponent } from './games/batonnets/board-batonnets/board-batonnets.component';
import { JoursFeriesPageComponent } from './sub-app/jours-feries-fr/jours-feries-page/jours-feries-page.component';

export const routes: Routes = [
	{ path: 'home', title: 'Accueil', component: HomepageComponent },
	{ path: 'inventaire/compteur', title: 'Signal : exemple inventaire', component: InventoryCounterComponent },
	{ path: 'games/batonnets', title: 'Jeu du bâtonnets', component: BoardBatonnetsComponent },
	{ path: 'sub-app/jours-feries-fr', title: 'Jours fériés français', component: JoursFeriesPageComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' }
];
