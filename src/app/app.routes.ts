import { Routes } from '@angular/router';
import { InventoryCounterComponent } from './inventory-counter/inventory-counter.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
	{ path: 'home', component: HomepageComponent },
	{ path: 'inventaire/compteur', component: InventoryCounterComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' }
];
