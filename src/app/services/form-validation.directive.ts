import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ilIDValidator(control: AbstractControl): ValidationErrors | null {
  function is_israeli_id_number(id: string): boolean {
    id = id.trim();
    if (id.length > 9) return false;
    id = id.padStart(9, '0');
      return Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) % 10 === 0;
  }
  return is_israeli_id_number(control.value) ? null : {invalidID: true};
}

// /** A hero's name can't match the given regular expression */
// export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} | null => {
//     const forbidden = nameRe.test(control.value);
//     return forbidden ? {forbiddenName: {value: control.value}} : null;
//   };
// }

// /** A hero's name can't match the hero's alter ego */
// export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
//   const name = control.get('name');
//   const alterEgo = control.get('alterEgo');

//   return name && alterEgo && name.value === alterEgo.value ? { identityRevealed: true } : null;
// };


// function is_israeli_id_number(id) {
// 	id = String(id).trim();
// 	if (id.length > 9 || isNaN(id)) return false;
// 	id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
// 		return Array.from(id, Number).reduce((counter, digit, i) => {
// 			const step = digit * ((i % 2) + 1);
// 			return counter + (step > 9 ? step - 9 : step);
// 		}) % 10 === 0;
// }
