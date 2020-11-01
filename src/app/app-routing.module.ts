import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from 'src/app/components/register/register.component';
import { HomeComponent } from 'src/app/components/home/home.component';

import { EspaceClientComponent } from 'src/app/components/interface-client/espace-client/espace-client.component';
import { EspacePrestataireComponent } from './components/interface-prestataire/espace-prestataire/espace-prestataire.component';

import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from 'src/app/components/interface-client/espace-client/dashboard/dashboard.component';
import { ProfilComponent } from 'src/app/components/interface-client/espace-client/profil/profil.component';

import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';
import { GarageComponent } from './components/interface-prestataire/espace-prestataire/garage/garage.component';
import { DashboardpresComponent } from './components/interface-prestataire/espace-prestataire/dashboardpres/dashboardpres.component';
import { ProfilpresComponent } from './components/interface-prestataire/espace-prestataire/profilpres/profilpres.component';

import { InterfaceClientComponent } from './components/interface-client/interface-client.component';
import { InterfacePrestataireComponent } from './components/interface-prestataire/interface-prestataire.component';
import { HomeclientComponent } from './components/interface-client/homeclient/homeclient.component';
import { HomepresComponent } from './components/interface-prestataire/homepres/homepres.component';
import { VehiculesComponent } from './components/interface-client/espace-client/vehicules/vehicules.component';
import { AdminComponent } from './admin/admin.component';
import { LayoutadminComponent } from './admin/layoutadmin/layoutadmin.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {UserProfileComponent} from'./user-profile/user-profile.component';

import { from } from 'rxjs';
import { NotificationsComponent } from './notifications/notifications.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { TableListComponent } from './table-list/table-list.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { MapsComponent } from './maps/maps.component';

import { PrestationsComponent } from './components/interface-client/prestations/prestations.component';

import { RdvpresComponent } from './components/interface-prestataire/rdvpres/rdvpres.component';
import { DisponibilteComponent } from './components/interface-prestataire/espace-prestataire/disponibilte/disponibilte.component';
import { ClientsadminComponent } from './clientsadmin/clientsadmin.component';
import { PrestatairesadminComponent } from './prestatairesadmin/prestatairesadmin.component';

import { CompleteprofilComponent } from './components/interface-client/completeprofil/completeprofil.component';
import { CompleteprofilpresComponent } from './components/interface-prestataire/completeprofilpres/completeprofilpres.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AboutComponent } from './components/about/about.component';

import { MentionslegalesComponent } from './components/mentionslegales/mentionslegales.component';
import { CarnetEntretienComponent } from './components/interface-client/carnet-entretien/carnet-entretien.component';


const routes: Routes = [
  {
    path: 'dash', canActivate: [AuthGuard] ,
    component: AdminLayoutComponent,
    children: [{
      path: 'admiin',
      component: UserProfileComponent ,

    },
  {
    path:'notifications',
    component:NotificationsComponent,


  },
  {
    path:'dashboard',
    component:DashboardAdminComponent,


  },
  {
    path:'clients',
    component:ClientsadminComponent,


  },
  {
    path:'prestataires',
    component:PrestatairesadminComponent,


  },
  {
    path:'demandes_inscriptions',
    component:TableListComponent,


  },
  {
    path:'icons',
    component:IconsComponent,


  } ,
  {
    path:'typographie',
    component:TypographyComponent,


  },
  {
    path:'maps',
    component:MapsComponent,


  }]

  },
  { path: 'register', component: RegisterComponent },
  { path: 'All4MyCarAdmin', component: LayoutadminComponent},
  { path: 'All4MyCar', component: LayoutComponent , children: [
    { path: 'client', component: InterfaceClientComponent, children: [
      {path: 'home', component: HomeclientComponent},
      {path: 'carnetentretien', component: CarnetEntretienComponent},
      {path: 'completeprofil', component: CompleteprofilComponent},
      {path: 'prestations', component: PrestationsComponent},
    { path: 'espace-client', component: EspaceClientComponent, canActivate: [AuthGuard] ,  children: [
      {path: 'vehicules', component: VehiculesComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profil', component: ProfilComponent},



    ] },]},
     { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    {path: 'contacts', component: ContactsComponent},
    {path: 'aboutus', component: AboutComponent},
    {path: 'termes-et-conditions', component: MentionslegalesComponent},



    { path: 'prestataire', component: InterfacePrestataireComponent, children: [
      {path: 'home', component: HomepresComponent},
      {path: 'rdv', component: RdvpresComponent},
      {path: 'completeprofil', component: CompleteprofilpresComponent},
    { path: 'espace-prestataire', component: EspacePrestataireComponent , canActivate: [AuthGuard] ,  children: [
      {path: 'garage', component: GarageComponent},
      {path: 'dashboardpres', component: DashboardpresComponent},
      {path: 'profilpres', component: ProfilpresComponent},
      {path: 'disponibilte', component: DisponibilteComponent},



    ] },]},
  ]},
  { path: '', redirectTo: 'All4MyCar/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes )],
  exports: [RouterModule],

})
export class AppRoutingModule { }
//commit
