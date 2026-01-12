import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Shared

import { MenuSuperior } from '../../../shared/components/menu-superior/menu-superior';

@Component({
  selector: 'app-home-layout',
  imports: [
    RouterOutlet,

    MenuSuperior
  ],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css',
})

export class HomeLayout {

}
