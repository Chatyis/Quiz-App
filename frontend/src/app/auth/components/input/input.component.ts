import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    ReactiveFormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() isPasswordType: boolean;
  @Input() description: string;
  @Input() formControl: FormControl;
}
