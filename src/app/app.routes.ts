import { Routes } from '@angular/router';
import { InventoryCounterComponent } from './inventory-counter/inventory-counter.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BoardBatonnetsComponent } from './games/batonnets/board-batonnets/board-batonnets.component';

export const routes: Routes = [
	{ path: 'home', component: HomepageComponent },
	{ path: 'inventaire/compteur', component: InventoryCounterComponent },
	{ path: 'games/batonnets', component: BoardBatonnetsComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' }
];
