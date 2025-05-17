import { Routes } from '@angular/router';
import { InventoryCounterComponent } from './inventory-counter/inventory-counter.component';

export const routes: Routes = [
	{ path: 'inventaire/compteur', component: InventoryCounterComponent },
	{ path: '', redirectTo: 'inventaire/compteur', pathMatch: 'full' }
];
