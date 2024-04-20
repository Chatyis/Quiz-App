import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {

}
