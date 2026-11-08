import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureOrTodayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
        return null;
    }

    const selectedDate =
        value instanceof Date
            ? value
            : new Date(value);

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate >= today
        ? null
        : { pastDate: true };
  };
}