import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value !== undefined && isNaN(value)) {
      return { 'notANumber': true };
    }
    return null;
  };
}


