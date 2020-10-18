import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const repeatPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPswd = control.get('repeatPswd');

  return password && repeatPswd && (password.value !== repeatPswd.value) ? {passDontMatch: true} : null;
}
