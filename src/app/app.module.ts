import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { HomeComponent } from 'src/app/components/home/home.component';


import { authInterceptorProviders } from './_helpers/auth.interceptor';



import { EspaceClientComponent } from 'src/app/components/espace-client/espace-client.component';
import { EspacePrestataireComponent } from './components/espace-prestataire/espace-prestataire.component';
import { VehiculesComponent } from 'src/app/components/espace-client/vehicules/vehicules.component';
import { DashboardComponent } from 'src/app/components/espace-client/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';


import { NavigationComponent } from 'src/app/components/espace-client/navigation/navigation.component';
import { ProfilComponent } from 'src/app/components/espace-client/profil/profil.component';
import { JwtModule, JwtModuleOptions, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';


import { ReactiveFormsModule } from '@angular/forms';

import {CalendarModule} from 'primeng/calendar';









@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    EspaceClientComponent,
    EspacePrestataireComponent,
    VehiculesComponent,
    DashboardComponent,
    LayoutComponent,
    NavigationComponent,
    ProfilComponent,
    HeaderComponent,
    FooterComponent

  ],
  imports: [
    CalendarModule,
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
