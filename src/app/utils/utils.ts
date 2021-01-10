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

export function areArraysEqual(arr1:any[],arr2:any[]): boolean {
  if(arr1.length != arr2.length) return false;
  for(let i=0;i<arr1.length;i++) {
    if(arr1[i] != arr2[i]) return false;
  }
  return true;
}
