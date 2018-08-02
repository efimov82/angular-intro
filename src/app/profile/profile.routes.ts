import { Routes } from '@angular/router';

import {
  SettingsComponent
} from './pages';
import { AuthGuardService } from '@app/auth/guards/auth-guard.service';

export const profileRoutes: Routes = [
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: SettingsComponent,
        canActivate: [AuthGuardService]
      },
    ]
  },
];
