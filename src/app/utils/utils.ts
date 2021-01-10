import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

// custom validator to check that two fields match
export function checkPasswordMatch(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }

    if (control.value !== matchingControl.value)
      matchingControl.setErrors({ notSame: true });
    else matchingControl.setErrors(null);
  };
}
