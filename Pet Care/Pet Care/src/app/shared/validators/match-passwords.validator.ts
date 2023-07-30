import { FormGroup, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordOneValue: string,
  passwordTwoValue: string
): ValidatorFn {
  return (control) => {
    const group = control as FormGroup
    const pass1 = group.get(passwordOneValue);
    const pass2 = group.get(passwordTwoValue);


    return pass1?.value === pass2?.value ? null :
    { matchPasswordsValidator: true } 
  };
}
