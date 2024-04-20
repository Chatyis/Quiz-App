import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

import { ActionButtonsComponent } from '../components/action-buttons/action-buttons.component';
import { FormBuilder, Validators } from '@angular/forms';
import { InputComponent } from '../components/input/input.component';
import { LoginService } from '../../../shared/services/rest-api/login.service';
import { passwordMatchValidator } from './password-match.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    MatButton,
    RouterLink,
    InputComponent,
    ActionButtonsComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = this.fb.group({
    userLogin: ['', Validators.required],
    userPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {validators: [passwordMatchValidator]})

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  protected register(): void {
    console.log(this.registerForm.errors?.['passwordsNotMatch']);
    for (const field in this.registerForm.controls) {
      this.registerForm.get(field).markAsTouched();
    }
    if (this.registerForm.valid) {
      let registerFormValue = this.registerForm.getRawValue();
      delete registerFormValue.confirmPassword;
      this.loginService.register(registerFormValue).subscribe(
        {
          next: () => {
            this.router.navigate(['main']);
          },
          error: (err) => {
            this.snackBar.open(err.error.message, "Close");
          }
        }
      );
    }
  }
}
