import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

import { ActionButtonsComponent } from '../components/action-buttons/action-buttons.component';
import { InputComponent } from '../components/input/input.component';
import { LoginService } from '../../../shared/services/rest-api/login.service';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatIcon, MatButton, RouterLink, InputComponent, ActionButtonsComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private loginService: LoginService) {
  }

  protected login(): void {
    //TODO login logic
  }
}
