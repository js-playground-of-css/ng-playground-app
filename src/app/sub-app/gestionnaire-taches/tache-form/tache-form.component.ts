import { Component, effect, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { GestionnaireTachesService } from '../services/gestionnaire-taches.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TodoWrite } from '../model/todo-write';
import { TodoForm } from '../model/todo-form';
import { DateUtils } from '../../../utils/date-utils';

@Component({
  selector: 'tache-form',
  imports: [ReactiveFormsModule],
  templateUrl: 'tache-form.component.html',
  styles: ``
})
export class TacheForm {

    readonly #router = inject(Router);

    titrePage = input<string>('Ajouter une tâche');

    intituleBoutonAction = input<string>('Ajouter la tâche à la liste');

    modeAjouter = input<boolean>(true);

    tache = input<TodoForm | null>(null);

    save = output<TodoForm>();

    readonly form = new FormGroup({
        titreTache: new FormControl('', [
            Validators.required
        ]),
        descriptionTache: new FormControl(''),
        dateTache: new FormControl('', [
            Validators.required
        ])
    });

    constructor() {
        effect(() => {
            const tacheCourante = this.tache();
            if(tacheCourante) {
                this.form.patchValue({
                    ...tacheCourante,
                    dateTache: DateUtils.transformDateToStringBoostrap(
                        tacheCourante.dateTache !== undefined ? tacheCourante.dateTache : new Date()
                    )
                });
            } else {
                this.form.reset();
            }
        });
    }

    goToTodolist() {
        this.#router.navigate(['sub-app/gestionnaire-taches']);
    }

    onSubmit() {
        if(this.form.valid) {
            const formValue = this.form.value;console.log(formValue);

            const formData : TodoForm = {
                ...this.tache(),
                ...formValue,
                dateTache: formValue.dateTache ? new Date(formValue.dateTache) : undefined
            };
            this.save.emit(formData);
        }
    }

}