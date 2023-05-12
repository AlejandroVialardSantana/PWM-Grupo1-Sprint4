import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ActivityInfoComponent } from './activity-info/activity-info.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';

import { FormsModule } from '@angular/forms';

import { FilterComponent } from './filter/filter.component';
import { ActivityComponent } from './activity/activity.component';

import { ActivityDescriptionPage } from '../pages/activity-description/activity-description.page';

import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [
        CommonModule,
        IonicModule, 
        FormsModule,
        MatPaginatorModule
    ],
    declarations: [
        ActivityInfoComponent,
        FooterComponent,
        LoaderComponent,
        ActivityDescriptionPage,
        HeaderComponent,
        FilterComponent,
        ActivityComponent
    ],
    exports: [
        ActivityInfoComponent,
        FooterComponent,
        LoaderComponent,
        ActivityDescriptionPage,
        HeaderComponent
    ]
})

export class ComponentsModule { }