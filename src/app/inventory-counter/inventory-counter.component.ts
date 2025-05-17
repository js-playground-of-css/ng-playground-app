import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-inventory-counter',
  imports: [],
  template: `
	<div class="text-white m-2" >
		<h2>Test signal & co</h2>
		<h3>Exemple d'un inventaire</h3>
		<p>Etat : {{ tresholdText() }}</p>
		<p>Quantité : {{ quantity() }}</p>
		<div class="btn-group" role="group" aria-label="Gestion de l'inventaire">
			<button type="button" class="btn btn-primary" (click)="remove()" [disabled]="quantity() <= 0" >-</button>
			<button type="button" class="btn btn-primary" (click)="add()" >+</button>
		</div>
	</div>
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
