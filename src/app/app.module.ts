import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { HomeComponent } from 'src/app/components/home/home.component';


import { authInterceptorProviders } from './_helpers/auth.interceptor';

import {CardModule} from 'primeng/card';

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
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';

import {MatTooltipModule} from '@angular/material/tooltip';

import {MultiSelectModule} from 'primeng/multiselect';



import { ReactiveFormsModule } from '@angular/forms';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';



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
import { RegistredialogComponent } from './components/registredialog/registredialog.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RdvpresComponent } from './components/interface-prestataire/rdvpres/rdvpres.component';
import { DisponibilteComponent } from './components/interface-prestataire/espace-prestataire/disponibilte/disponibilte.component';

import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule } from '@angular/material/icon';



import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';



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
import { PrestationsComponent } from './components/interface-client/prestations/prestations.component';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ClientsadminComponent } from './clientsadmin/clientsadmin.component';
import { PrestatairesadminComponent } from './prestatairesadmin/prestatairesadmin.component';
import { CompleteprofilComponent } from './components/interface-client/completeprofil/completeprofil.component';
import { CompleteprofilpresComponent } from './components/interface-prestataire/completeprofilpres/completeprofilpres.component';
import {StepsModule} from 'primeng/steps';
import { CompleteprofilfromComponent } from './components/interface-client/completeprofil/completeprofilfrom/completeprofilfrom.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AboutComponent } from './components/about/about.component';
import { MentionslegalesComponent } from './components/mentionslegales/mentionslegales.component';
import { CarnetEntretienComponent } from './components/interface-client/carnet-entretien/carnet-entretien.component';

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
    NavbarAdminComponent,
    RdvpresComponent,
    DisponibilteComponent,

    RegistredialogComponent,

    PrestationsComponent,

    ClientsadminComponent,

    PrestatairesadminComponent,
    CompleteprofilComponent,

    CompleteprofilpresComponent,

    CompleteprofilfromComponent,

    ContactsComponent,

    AboutComponent,

    MentionslegalesComponent,

    CarnetEntretienComponent,





  ],
  imports: [
    MatTabsModule,
    TooltipModule,
    MessageModule,
    MessagesModule,
    MatIconModule,
    ConfirmDialogModule,
    CheckboxModule,
   MatProgressSpinnerModule,
    ProgressSpinnerModule,
    AutoCompleteModule,
    MatAutocompleteModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    MatCheckboxModule,
    MultiSelectModule,
    MatDialogModule,
    MenubarModule,
    PanelMenuModule,
    ToastModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    BrowserModule,
    MatCardModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule,
    CardModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatCheckboxModule,
    TableModule,
    FileUploadModule,
    StepsModule,
    MatStepperModule,
    CalendarModule  ],
  providers: [authInterceptorProviders, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
//commit
