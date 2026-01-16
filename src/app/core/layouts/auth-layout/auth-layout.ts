import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Shared

import { DADOS } from '../../../shared/constants/dados.constant';
import { Loading } from "../../../features/loading/components/loading/loading";
import { ToastPadrao } from "../../../shared/components/toasts/components/toast-padrao/toast-padrao";

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,

    Loading,
    ToastPadrao
],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})

export class AuthLayout {
  empresaNome: string = DADOS.EMPRESA_NOME;
}
