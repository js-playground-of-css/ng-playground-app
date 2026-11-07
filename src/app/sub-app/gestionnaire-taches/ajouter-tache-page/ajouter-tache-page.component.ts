import { Component, inject } from '@angular/core';
import { GestionnaireTachesService } from '../services/gestionnaire-taches.service';
import { TacheForm } from '../tache-form/tache-form.component';
import { TodoForm } from '../model/todo-form';

@Component({
  selector: 'ajouter-tache-page',
  imports: [TacheForm],
  templateUrl: 'ajouter-tache-page.component.html',
  styles: ``
})
export class AjouterTachePage {

    private gestionnaireTachesService = inject(GestionnaireTachesService);

    onSave(tache : TodoForm) {
        if(
            tache.titreTache !== undefined && tache.titreTache !== null &&
            tache.descriptionTache !== undefined && tache.descriptionTache !== null &&
            tache.dateTache != undefined
        ) {
            this.gestionnaireTachesService.ajouterTache({
                todoId: 0,
                todoTitle: tache.titreTache,
                todoDescription: tache.descriptionTache,
                todoDate: this.isString(tache.dateTache) ? new Date(tache.dateTache) : tache.dateTache,
                isComplete: false
            });
        }
    }

    private isString(uneVariable : any) {
        return typeof uneVariable === 'string' || uneVariable instanceof String;
    }

}