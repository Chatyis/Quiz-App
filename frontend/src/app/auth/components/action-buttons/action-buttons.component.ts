import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    NgIf,
    MatIcon
  ],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss'
})
export class ActionButtonsComponent {
  @Input() buttonRoute: string;
  @Input() leftButtonName: string;
  @Input() rightButtonName: string;
  @Input() isGuestButtonVisible = false;
  @Output() nextButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.nextButtonClicked.emit();
    }
  }
}
