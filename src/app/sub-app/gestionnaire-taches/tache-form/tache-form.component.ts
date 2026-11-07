import { Component, effect, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TodoForm } from '../model/todo-form';
import { DateUtils } from '../../../utils/date-utils';
import { futureOrTodayValidator } from '../../../utils/validator/futur-or-today-validator';

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
            Validators.required,
            Validators.minLength(5)
        ]),
        descriptionTache: new FormControl('', [
            Validators.required,
            Validators.minLength(5)
        ]),
        dateTache: new FormControl('', [
            Validators.required/*,
            futureOrTodayValidator()*/
        ])
    });

    constructor() {
        effect(() => {
            const tacheCourante = this.tache();
            if(tacheCourante) {
                console.log(typeof tacheCourante.dateTache)
                this.form.patchValue({
                    ...tacheCourante,
                    dateTache: DateUtils.transformDateToStringBoostrap(
                        tacheCourante.dateTache ?? new Date()
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