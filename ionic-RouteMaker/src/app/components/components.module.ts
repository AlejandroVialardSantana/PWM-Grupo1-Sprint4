import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivityInfoComponent } from './activity-info/activity-info.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterComponent } from './filter/filter.component';
import { ActivityComponent } from './activity/activity.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ActivityDescriptionPage } from '../pages/activity-description/activity-description.page';
import { FormRegisterComponent } from './form-register/form-register.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormPerfilComponent } from './form-perfil/form-perfil.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { MyActivitiesPage } from '../pages/my-activities/my-activities.page';
import { MyActivityListComponent } from './my-activity-list/my-activity-list.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule, 
        FormsModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        ActivityInfoComponent,
        FooterComponent,
        LoaderComponent,
        ActivityDescriptionPage,
        HeaderComponent,
        FilterComponent,
        ActivityComponent,
        SearchbarComponent, 
        FormRegisterComponent,
        FormLoginComponent,
        MyActivityListComponent,
        MyActivitiesPage,
        FormPerfilComponent,
        DeleteAccountComponent
    ],
    exports: [
        ActivityInfoComponent,
        FooterComponent,
        LoaderComponent,
        ActivityDescriptionPage,
        HeaderComponent,
        MatPaginatorModule,
        FilterComponent,
        ActivityComponent,
        SearchbarComponent, 
        FormRegisterComponent,
        FormLoginComponent,
        MyActivityListComponent,
        MyActivitiesPage,
        FormPerfilComponent,
        DeleteAccountComponent
    ]
})

export class ComponentsModule { }