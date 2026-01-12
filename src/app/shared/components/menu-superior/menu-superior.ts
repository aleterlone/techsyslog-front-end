import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-superior',
  imports: [
    RouterLink
  ],
  templateUrl: './menu-superior.html',
  styleUrl: './menu-superior.css',
})

export class MenuSuperior {
  private readonly _router = inject(Router);

  constructor() { }

  sair() {
    this._router.navigate(["/login"]);
  }
}
