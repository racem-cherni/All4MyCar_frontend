import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { HomeComponent } from 'src/app/components/home/home.component';


import { authInterceptorProviders } from './_helpers/auth.interceptor';



import { EspaceClientComponent } from 'src/app/components/interface-client/espace-client/espace-client.component';
import { EspacePrestataireComponent } from './components/interface-prestataire/espace-prestataire/espace-prestataire.component';
import { DashboardComponent } from 'src/app/components/interface-client/espace-client/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';


import { NavigationComponent } from 'src/app/components/interface-client/espace-client/navigation/navigation.component';
import { ProfilComponent } from 'src/app/components/interface-client/espace-client/profil/profil.component';
import { JwtModule, JwtModuleOptions, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';


import {MatTooltipModule} from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';



import { NavigationpresComponent } from './components/interface-prestataire/espace-prestataire/navigationpres/navigationpres.component';
import { GarageComponent } from './components/interface-prestataire/espace-prestataire/garage/garage.component';
import { DashboardpresComponent } from './components/interface-prestataire/espace-prestataire/dashboardpres/dashboardpres.component';
import { ProfilpresComponent } from './components/interface-prestataire/espace-prestataire/profilpres/profilpres.component';
import { DialogvehiculeComponent } from 'src/app/components/interface-client/espace-client/vehicules/dialogvehicule/dialogvehicule.component';


import { InterfaceClientComponent } from './components/interface-client/interface-client.component';
import { InterfacePrestataireComponent } from './components/interface-prestataire/interface-prestataire.component';
import { HomeclientComponent } from './components/interface-client/homeclient/homeclient.component';
import { HomepresComponent } from './components/interface-prestataire/homepres/homepres.component';
import {MatSelectModule} from '@angular/material/select';
import { VehiculesComponent } from './components/interface-client/espace-client/vehicules/vehicules.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminComponent } from './admin/admin.component';
import { LayoutadminComponent } from './admin/layoutadmin/layoutadmin.component';
import { AdminfooterComponent } from './admin/layoutadmin/adminfooter/adminfooter.component';
import { AdminheaderComponent } from './admin/layoutadmin/adminheader/adminheader.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';



import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';


import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { from } from 'rxjs';


import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { FooterAdminComponent } from './layouts/admin-layout/footer-admin/footer-admin.component';
import {NavbarAdminComponent  } from './layouts/admin-layout/navbar-admin/navbar-admin.component';
import {SidebarAdminComponent} from './layouts/admin-layout/sidebar-admin/sidebar-admin.component';


@NgModule({
  declarations: [
    UpgradeComponent,
    TypographyComponent,
    TableListComponent,
    NotificationsComponent,
    MapsComponent,
    IconsComponent,
    AppComponent,
    RegisterComponent,
    HomeComponent,
    EspaceClientComponent,
    EspacePrestataireComponent,
    DashboardComponent,
    LayoutComponent,
    NavigationComponent,
    ProfilComponent,
    FooterComponent,
    DashboardpresComponent,
    NavigationpresComponent,
    ProfilpresComponent,
    GarageComponent,
    InterfaceClientComponent,
    InterfacePrestataireComponent,
    HomeclientComponent,
    HomepresComponent,
    VehiculesComponent,
    HeaderComponent,
    DialogvehiculeComponent,
    AdminComponent,
    LayoutadminComponent,
    AdminfooterComponent,
    AdminheaderComponent,
    AdminLayoutComponent,
    DashboardAdminComponent,
    UserProfileComponent,
    FooterAdminComponent,
    SidebarAdminComponent,
    NavbarAdminComponent




  ],
  imports: [
   MatProgressSpinnerModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule,
    BrowserAnimationsModule,
    MatTooltipModule
   ],
  providers: [authInterceptorProviders, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
