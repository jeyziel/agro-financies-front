import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InterceptorModule } from 'src/app/interceptors/interceptor.module';
import {ComponentsModule} from '../../components/components.module';
import { GeralComponent } from 'src/app/pages/dashboard/geral/geral.component';
import { IndividualComponent } from 'src/app/pages/dashboard/individual/individual.component';
// import { ToastrModule, ToastrService } from 'ngx-toastr';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        ClipboardModule,
        InterceptorModule,
        ComponentsModule,
        
    ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    GeralComponent,
    IndividualComponent,
  ]

})

export class AdminLayoutModule {}
