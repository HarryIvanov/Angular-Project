import { ValidatorFn } from '@angular/forms';

export function appEmailValidator(domains: string[]): ValidatorFn {
  const domainStrings = domains.join('|');
  const regExp = new RegExp(`[^@]{3,}@gmail || ^@]{3,}@abv \.(${domainStrings})$`);

  return (control) => {
    return control.value === '' || regExp.test(control.value)
      ? null
      : { appEmailValidator: true };
  };
}
