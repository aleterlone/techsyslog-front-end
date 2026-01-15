import { Routes } from '@angular/router';

// Core

import { authGuard } from './core/guards/auth-guard';
import { homeGuard } from './core/guards/home-guard';

import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { HomeLayout } from './core/layouts/home-layout/home-layout';

// Features

import { Home } from './features/home/pages/home/home';
import { Login } from './features/auth/pages/login/login';
import { LoginCadastrar } from './features/auth/pages/login-cadastrar/login-cadastrar';
import { PedidoListar } from './features/pedidos/pages/pedido-listar/pedido-listar';
import { PedidoCadastrar } from './features/pedidos/pages/pedido-cadastrar/pedido-cadastrar';
import { UsuarioListar } from './features/usuarios/pages/usuario-listar/usuario-listar';
import { UsuarioCadastrar } from './features/usuarios/pages/usuario-cadastrar/usuario-cadastrar';

export const routes: Routes = [
  {
    path: "home",
    component: HomeLayout,
    children: [
      { path: "", component: Home },
      { path: "pedido-cadastrar", component: PedidoCadastrar, canActivate: [homeGuard] },
      { path: "pedido-listar", component: PedidoListar, canActivate: [homeGuard] },
      { path: "usuario-cadastrar", component: UsuarioCadastrar, canActivate: [homeGuard] },
      { path: "usuario-listar", component: UsuarioListar, canActivate: [homeGuard] }
    ]
  },
  {
    path: "auth",
    component: AuthLayout,
    canActivate: [authGuard],
    children: [
      { path: "", pathMatch: "full", redirectTo: "login" },
      { path: "login", component: Login },
      { path: "login-cadastrar", component: LoginCadastrar }
    ]
  },
  {
    path: "**",
    redirectTo: "home"
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "auth"
  }
];
