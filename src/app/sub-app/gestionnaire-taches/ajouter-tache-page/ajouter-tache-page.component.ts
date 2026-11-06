import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GestionnaireTachesService } from '../services/gestionnaire-taches.service';

@Component({
  selector: 'ajouter-tache-page',
  imports: [],
  templateUrl: 'ajouter-tache-page.component.html',
  styles: ``
})
export class AjouterTachePage {

    private gestionnaireTachesService = inject(GestionnaireTachesService);

    readonly #router = inject(Router);

    goToTodolist() {
        this.#router.navigate(['sub-app/gestionnaire-taches']);
    }

}