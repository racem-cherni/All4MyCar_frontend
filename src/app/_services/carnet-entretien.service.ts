import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarburantCarnet } from '../entities/carburant-carnet';
import { DepenseCarnet } from '../entities/depense-carnet';
import { EntretienCarnet } from '../entities/entretien-carnet';
import { OdometerCarnet } from '../entities/odometer-carnet';
import { TrajetCarnet } from '../entities/trajet-carnet';
import { Vehicule } from '../entities/vehicule';

import { TokenStorageService } from './token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CarnetEntretienService {



  constructor(private http: HttpClient, private token: TokenStorageService) { }
  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
});

private baseUrluser = 'http://localhost:8081/api';


ajouter_carburant( carburant : CarburantCarnet): Observable<any> {
  return this.http.post( this.baseUrluser + '/ajouter_carburant/' ,carburant
  ,{ headers: this.header});
}

ajouter_entretien( entretien : EntretienCarnet): Observable<any> {
  return this.http.post( this.baseUrluser + '/ajouter_entretien/' ,entretien
  ,{ headers: this.header});
}

ajouter_depense( depense : DepenseCarnet): Observable<any> {
  return this.http.post( this.baseUrluser + '/ajouter_depense/' ,depense
  ,{ headers: this.header});
}

ajouter_trajet( trajet : TrajetCarnet): Observable<any> {
  return this.http.post( this.baseUrluser + '/ajouter_trajet/' ,trajet
  ,{ headers: this.header});
}

ajouter_odometer( odometer : OdometerCarnet): Observable<any> {
  return this.http.post( this.baseUrluser + '/ajouter_odometer/' ,odometer
  ,{ headers: this.header});
}
getAllHistorique(): Observable<any> {

  return this.http.get(this.baseUrluser + '/gethistorique', {
    headers: this.header});
}
getPremiersHistorique(): Observable<any> {

  return this.http.get(this.baseUrluser + '/getpremiershistorique', {
    headers: this.header});
}
getHistoriqueByVehicule(id : number): Observable<any> {

  return this.http.get(this.baseUrluser + '/gethistoriquebyVehicule/'+`${id}`, {
    headers: this.header});
}

getCarburantParPeriode(idvehicule:number,periode : String) : Observable<any> {
  return this.http.get(this.baseUrluser + '/getCarburantParPeriode/'+`${idvehicule}`+"/"+`${periode}`, {
    headers: this.header});
  }

  getDepense_carburantMois(carburant_forstats: CarburantCarnet[]) : Observable<any>{
    return this.http.get(this.baseUrluser + '/getDepense_carburantMois/'+`${carburant_forstats}`, {
      headers: this.header});
    }
}
