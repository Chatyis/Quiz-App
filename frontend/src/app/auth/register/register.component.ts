import { Component } from '@angular/core';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { ActionButtonsComponent } from '../components/action-buttons/action-buttons.component';
import { InputComponent } from '../components/input/input.component';

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
  protected register(): void {
    // TODO apply register logic
  }
}
