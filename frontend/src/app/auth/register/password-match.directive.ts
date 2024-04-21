import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const userPasswordControl = (control as FormGroup).controls['userPassword'];
  const userConfirmPasswordControl = (control as FormGroup).controls['confirmPassword'];

  const _passwordsNotMatch = userPasswordControl.value !== userConfirmPasswordControl.value;

  // console.log(userConfirmPasswordControl.errors);
  // TODO confirmPasswordValidator dissappears
  if (_passwordsNotMatch) {
    userConfirmPasswordControl.setErrors({'incorrect': true})
  } else if (userConfirmPasswordControl.errors) {
    if (Object.keys(userConfirmPasswordControl.errors).length === 1) {
      userConfirmPasswordControl.setErrors(userConfirmPasswordControl.errors)
    }
  }

  return _passwordsNotMatch ? {passwordsNotMatch: true} : null;
};
