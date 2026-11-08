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
        ]),
        completeTache: new FormControl(false, { nonNullable: true })
    });

    constructor() {
        effect(() => {
            const tacheCourante = this.tache();
            if(tacheCourante) {
                const dateTache : string = typeof tacheCourante.dateTache === 'string' ?
                    tacheCourante.dateTache :
                    DateUtils.transformDateToStringFrench(
                        tacheCourante.dateTache ?? new Date()
                    );
                this.form.patchValue({
                    ...tacheCourante,
                    dateTache: dateTache,
                    completeTache: tacheCourante.isComplete
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
            const formValue = this.form.value;

            const formData : TodoForm = {
                ...this.tache(),
                ...formValue,
                dateTache: formValue.dateTache ? new Date(formValue.dateTache) : undefined,
                isComplete: formValue.completeTache
            };
            this.save.emit(formData);
        }
    }

}