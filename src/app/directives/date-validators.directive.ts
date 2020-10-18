import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateGreaterThenDateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const greater = control.get('to').value;
  const than = control.get('from').value;

  return greater && than && (greater < than ) ? {notGreaterThan: true} : null;
}

export function dateInThaPastValidator(now: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return (control.value > now ) ? {dateNotInThePast: {value: control.value}} : null;
  }
}
