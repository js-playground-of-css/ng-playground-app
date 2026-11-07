import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GestionnaireTachesService } from '../services/gestionnaire-taches.service';
import { TacheForm } from '../tache-form/tache-form.component';
import { TodoForm } from '../model/todo-form';

@Component({
  selector: 'editer-tache-page',
  imports: [TacheForm],
  templateUrl: 'editer-tache-page.component.html',
  styles: ``
})
export class EditerTachePage implements OnInit {

    private gestionnaireTachesService = inject(GestionnaireTachesService);

    readonly #router = inject(Router);

    tacheCourante = signal<TodoForm | null>(null);

    ngOnInit(): void {
        const navigation = this.#router.getCurrentNavigation();
        const tacheAModifier = navigation?.extras?.state?.['tache'];

        if(tacheAModifier) {
            this.tacheCourante.set({
                titreId: tacheAModifier.todoId,
                titreTache: tacheAModifier.todoTitle,
                descriptionTache: tacheAModifier.todoDescription,
                dateTache: tacheAModifier.todoDate
            });
        }
    }
    
    onSave(tache : TodoForm) {
        if(
            tache.titreId !== undefined &&
            tache.titreTache !== undefined && tache.titreTache !== null &&
            tache.descriptionTache !== undefined && tache.descriptionTache !== null &&
            tache.dateTache != undefined
        ) {
            this.gestionnaireTachesService.modifierTache({
                todoId: tache.titreId,
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