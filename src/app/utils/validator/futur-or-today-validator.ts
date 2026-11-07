import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureOrTodayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
        return null;
    }

    const inputDate = new Date(control.value);

    // On ignore l'heure pour comparer uniquement les dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    inputDate.setHours(0, 0, 0, 0);

    return inputDate < today
        ? { pastDate: true }
        : null;
  };
}