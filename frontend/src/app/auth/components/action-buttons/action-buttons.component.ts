import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss'
})
export class ActionButtonsComponent {
  @Input() buttonRoute: string;
  @Input() leftButtonName: string;
  @Input() rightButtonName: string;
  @Output() nextButtonClicked: EventEmitter<any> = new EventEmitter<any>();
}
