import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import { ActionButtonsComponent } from '../components/action-buttons/action-buttons.component';
import { InputComponent } from '../components/input/input.component';
import { LoginService } from '../../../shared/services/rest-api/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatIcon, MatButton, RouterLink, InputComponent, ActionButtonsComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.group({
    userLogin: ['', Validators.required],
    userPassword: ['', Validators.required],
  })

  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  protected login(): void {
    for (const field in this.loginForm.controls) {
      this.loginForm.get(field).markAsTouched();
    }

    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.getRawValue()).pipe(
        catchError(this.handleError)
      ).subscribe(
        {
          next: () => {
            this.router.navigate(['main']);
          },
          error: (err) => this.snackBar.open(err.error.message, "Close")
        }
      );
    }
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
