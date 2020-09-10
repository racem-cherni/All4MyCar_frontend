import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from 'src/app/components/register/register.component';
import { HomeComponent } from 'src/app/components/home/home.component';

import { EspaceClientComponent } from 'src/app/components/espace-client/espace-client.component';
import { EspacePrestataireComponent } from './components/espace-prestataire/espace-prestataire.component';
import { VehiculesComponent } from 'src/app/components/espace-client/vehicules/vehicules.component';

import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from 'src/app/components/espace-client/dashboard/dashboard.component';
import { ProfilComponent } from 'src/app/components/espace-client/profil/profil.component';

import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';

const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'tmp', component: LayoutComponent , children: [
    { path: 'espace-client', component: EspaceClientComponent, canActivate: [AuthGuard] ,  children: [
      {path: 'vehicules', component: VehiculesComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profil', component: ProfilComponent},
    ] }, { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
  ]},
  { path: 'espace-prestataire', component: EspacePrestataireComponent },
  { path: 'vehicules', component: VehiculesComponent },
  { path: '', redirectTo: 'tmp/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
