import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Shared

import { MenuSuperior } from '../../../shared/components/menu-superior/menu-superior';
import { ToastPadrao } from '../../../shared/components/toasts/components/toast-padrao/toast-padrao';

@Component({
  selector: 'app-home-layout',
  imports: [
    RouterOutlet,

    MenuSuperior,
    ToastPadrao
  ],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css',
})

export class HomeLayout {

}
