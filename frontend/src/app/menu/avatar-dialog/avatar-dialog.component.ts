import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { NgForOf, NgOptimizedImage } from '@angular/common';

import { MenuService } from '../../../shared/services/rest-api/menu.service';

@Component({
  selector: 'app-avatar-dialog',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './avatar-dialog.component.html',
  styleUrl: './avatar-dialog.component.scss'
})
export class AvatarDialogComponent {
  constructor(protected menuService: MenuService,
              public dialogRef: MatDialogRef<AvatarDialogComponent>,
              private _elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.dialogRef.close();
    }
  }

  protected selectAvatar(avatarId: number): void {
    this.menuService.setUserAvatar(avatarId).subscribe(() => this.dialogRef.close(avatarId));
  }
}
