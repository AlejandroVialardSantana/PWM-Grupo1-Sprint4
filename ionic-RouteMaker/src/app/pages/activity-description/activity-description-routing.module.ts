import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityDescriptionPage } from './activity-description.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityDescriptionPageRoutingModule {}
