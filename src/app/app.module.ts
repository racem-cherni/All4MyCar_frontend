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
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';


import { NavigationComponent } from 'src/app/components/interface-client/espace-client/navigation/navigation.component';
import { ProfilComponent } from 'src/app/components/interface-client/espace-client/profil/profil.component';
import { JwtModule, JwtModuleOptions, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';



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









@NgModule({
  declarations: [
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
    AdminheaderComponent




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
    BrowserAnimationsModule ],
  providers: [authInterceptorProviders, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
