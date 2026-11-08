import { Component, signal, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-inventory-counter',
  imports: [
	MatButtonModule,
    MatIconModule
  ],
  template: `
	<div class="text-white m-2" >
		<h2>Test signal & co</h2>
		<h3>Exemple d'un inventaire</h3>
		<p>Etat : {{ tresholdText() }}</p>
		<p>Quantité : {{ quantity() }}</p>
		<div class="inventory-button-row" aria-label="Gestion de l'inventaire">
			<button type="button" mat-mini-fab (click)="remove()" [disabled]="quantity() <= 0" >
  				<mat-icon aria-hidden="false" aria-label="Réduire le stock" fontIcon="exposure_neg_1" ></mat-icon>
			</button>
			<button type="button" mat-mini-fab (click)="add()" >
  				<mat-icon aria-hidden="false" aria-label="Augmenter le stock" fontIcon="exposure_plus_1" ></mat-icon>
			</button>
		</div>
	</div>
  `,
  styles: `
	.inventory-button-row button {
  		margin-right: 6px;
	}
  `
})
export class InventoryCounterComponent {
	quantity = signal(15);
	tresholdText = computed(() => {
		let outputText = `Il n'y a plus de stock !`;
		if(this.quantity() > 10 && this.quantity() < 20) {
			outputText = `Rien n'à craindre le stock est correcte !`;
		} else if(this.quantity() >= 20) {
			outputText = `Le stock est excellent`;
		} else if(this.quantity() > 0) {
			outputText = `Le stock est dans un état critique !`;
		}
		return outputText;
	});

	add() {
		this.quantity.update(n => n+1);
	}

	remove() {
		this.quantity.update(n => n-1);
	}

}
