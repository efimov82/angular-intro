import { Routes } from '@angular/router';

import {
  LoginComponent,
  LogoutComponent
} from './pages';

export const authRoutes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
    ]
  },
];
