import { Component } from '@angular/core';

// Pages

import { UsuarioCadastrar } from "../../../usuarios/pages/usuario-cadastrar/usuario-cadastrar";

@Component({
  selector: 'app-login-cadastrar',
  imports: [
    UsuarioCadastrar
  ],
  templateUrl: './login-cadastrar.html',
  styleUrl: './login-cadastrar.css',
})

export class LoginCadastrar {

}
