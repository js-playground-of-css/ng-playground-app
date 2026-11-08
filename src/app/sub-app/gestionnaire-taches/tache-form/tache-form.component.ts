import { Component, effect, inject, input, output, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoForm } from '../model/todo-form';
import { futureOrTodayValidator } from '../../../utils/validator/futur-or-today-validator';
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
            Validators.required,
            Validators.minLength(5)
        ]),
        descriptionTache: new FormControl('', [
            Validators.required,
            Validators.minLength(5)
        ]),
        dateTache: new FormControl('', [
            Validators.required,
            futureOrTodayValidator()
        ]),
        completeTache: new FormControl(false, { nonNullable: true })
    });

    readonly tacheCompletee = toSignal(
        this.form.controls.completeTache.valueChanges,
        { initialValue: this.form.controls.completeTache.value }
    );

    readonly intituleTacheComplete = computed(() => this.tacheCompletee() ? 'Tâche complétée' : 'Tâche à compléter');

    constructor() {
        effect(() => {
            const tacheCourante = this.tache();
            if(tacheCourante) {
                const transformedDate : Date = typeof tacheCourante.dateTache === 'string' ?
                    DateUtils.stringToDateFr(tacheCourante.dateTache) : new Date();
                const dateTache : string = DateUtils.transformDateToString(transformedDate);
                this.form.patchValue({
                    ...tacheCourante,
                    completeTache: tacheCourante.isComplete,
                    dateTache: dateTache
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