import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ActivityInfoComponent } from './activity-info/activity-info.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';

import { ActivityDescriptionPage } from '../pages/activity-description/activity-description.page';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [
        ActivityInfoComponent,
        FooterComponent,
        LoaderComponent,
        ActivityDescriptionPage
    ],
    exports: [
        ActivityInfoComponent,
        FooterComponent,
        LoaderComponent,
        ActivityDescriptionPage
    ]
})

export class ComponentsModule { }