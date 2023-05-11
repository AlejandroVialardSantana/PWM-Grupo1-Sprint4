import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDescriptionPageRoutingModule } from './activity-description-routing.module';

import { ActivityDescriptionPage } from './activity-description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityDescriptionPageRoutingModule
  ],
  declarations: []
})
export class ActivityDescriptionPageModule {}
