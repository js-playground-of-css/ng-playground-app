import { Component, effect, inject, input, output, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { TodoForm } from '../model/todo-form';
import { futureOrTodayValidator } from '../../../utils/validator/futur-or-today-validator';
import { DateUtils } from '../../../utils/date-utils';

@Component({
  selector: 'tache-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: 'tache-form.component.html',
  styles: `
    .form-field-custom mat-form-field {
        width: 40%;
    }
    mat-checkbox {
        margin-bottom: 10px;
    }
  `
})
export class TacheForm {

    readonly #router = inject(Router);

    titrePage = input<string>('Ajouter une tâche');

    intituleBoutonAction = input<string>('Ajouter la tâche à la liste');

    tache = input<TodoForm | null>(null);

    save = output<TodoForm>();

    private fb = inject(FormBuilder);

    readonly form = this.fb.group({
        titreTache: new FormControl('', [
            Validators.required,
            Validators.minLength(5)
        ]),
        descriptionTache: new FormControl('', [
            Validators.required,
            Validators.minLength(5)
        ]),
        dateTache: new FormControl<Date | null>(null, [
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
                const transformedDate : Date | undefined = typeof tacheCourante.dateTache === 'string' ?
                    DateUtils.stringToDateFr(tacheCourante.dateTache) : tacheCourante.dateTache;
                this.form.patchValue({
                    ...tacheCourante,
                    completeTache: tacheCourante.isComplete,
                    dateTache: transformedDate
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
                dateTache: formValue.dateTache ?? undefined,
                isComplete: formValue.completeTache
            };
            this.save.emit(formData);
        }
    }

}