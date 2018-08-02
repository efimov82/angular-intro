import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialsModule } from '@app/materials/materials.module';
import { SharedModule } from '@app/shared/shared.module';

import { SettingsComponent } from './pages/settings/settings.component';
import { profileRoutes } from '@app/profile/profile.routes';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    SharedModule,
    // Routing
    RouterModule.forChild(
      profileRoutes
    )
  ],
  declarations: [SettingsComponent]
})
export class ProfileModule { }
