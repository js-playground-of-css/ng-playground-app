import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GestionnaireTachesService } from '../services/gestionnaire-taches.service';
import { TacheForm } from '../tache-form/tache-form.component';
import { TodoForm } from '../model/todo-form';
import { DateUtils } from '../../../utils/date-utils';

@Component({
  selector: 'ajouter-tache-page',
  imports: [TacheForm],
  templateUrl: 'ajouter-tache-page.component.html',
  styles: ``
})
export class AjouterTachePage {

    private gestionnaireTachesService = inject(GestionnaireTachesService);

    readonly #router = inject(Router);

    onSave(tache : TodoForm) {
        if(
            tache.titreTache !== undefined && tache.titreTache !== null &&
            tache.dateTache != undefined
        ) {
            this.gestionnaireTachesService.ajouterTache({
                todoTitle: tache.titreTache,
                todoDescription: 
                    tache.descriptionTache !== undefined && tache.descriptionTache !== null ? 
                    tache.descriptionTache : 'Description par défaut',
                todoDate: DateUtils.transformDateToStringBoostrap(tache.dateTache),
                isComplete: tache.isComplete ?? false
            }).subscribe({
                next: (response) => {
                    if(response.code == 201) {
                        // go to todolist
                        this.#router.navigate(['/sub-app/gestionnaire-taches']);
                    } else {
                        console.log(`Code retour inattendu : ${response.code}`);
                    }
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    }

    private isString(uneVariable : any) {
        return typeof uneVariable === 'string' || uneVariable instanceof String;
    }

}