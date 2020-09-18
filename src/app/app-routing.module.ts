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
const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'All4MyCar', component: LayoutComponent , children: [
    { path: 'client', component: InterfaceClientComponent, children: [
      {path: 'home', component: HomeclientComponent},
    { path: 'espace-client', component: EspaceClientComponent, canActivate: [AuthGuard] ,  children: [
      {path: 'vehicules', component: VehiculesComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profil', component: ProfilComponent},


    ] },]},
     { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'prestataire', component: InterfacePrestataireComponent, children: [
      {path: 'home', component: HomepresComponent},
    { path: 'espace-prestataire', component: EspacePrestataireComponent , canActivate: [AuthGuard] ,  children: [
      {path: 'garage', component: GarageComponent},
      {path: 'dashboardpres', component: DashboardpresComponent},
      {path: 'profilpres', component: ProfilpresComponent},


    ] },]},
  ]},
  { path: '', redirectTo: 'All4MyCar/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
