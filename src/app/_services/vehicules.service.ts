import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';import { Injectable } from '@angular/core';
import { VehiculeMarque } from '../entities/vehicule-marque';
import { Observable } from 'rxjs';
import { VehiculeModel } from '../entities/vehicule-model';
import { map } from 'rxjs/operators';
import { Vehicule } from '../entities/vehicule';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VehiculesService {

  constructor(private http: HttpClient, private token: TokenStorageService) { }
  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
});

private baseUrluser = 'http://localhost:8081/api';
private marqueUrl = 'http://localhost:8081/api/marque?page=0&size=121';


getAllVehiculeMarqueModel(): Observable<VehiculeMarque[]> {

  /*return this.http.get<GetResponseMarque>(this.baseUrluser + '/vehicule_marques').pipe(
    map(response => response._embedded.marques)
  );*/
  //getVehiculeMarqueModel
  //return this.http.get(this.baseUrluser +'/getVehiculeMarqueModel', { responseType: 'text' },);
return this.http.get<GetResponseMarque>(this.marqueUrl).pipe(
    map(response => response._embedded.marque));

}

getModels(MarqueName : string) : Observable<VehiculeModel[]> {
   const searchModelUrl = `${this.baseUrluser}/vehicule_models/search/findByMarqueName?name=${MarqueName}`;
  return this.http.get<GetResponseModels>(searchModelUrl)
  .pipe(map(response => response._embedded.vehicule_models));
}

submitevehicule(vehicule : Vehicule): Observable<Vehicule>{
  return this.http.post<Vehicule>(this.baseUrluser + '/addvehicule' , vehicule, httpOptions);
}

getVehicules(idclient : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/vehicules/search/findByClientId?id=${idclient}`;
 return this.http.get<GetResponseVehicules>(searchModelUrl)
 .pipe(map(response => response._embedded.vehicules));
}

getVehiculess(): Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/getVehiculeOfClient`;
  return this.http.get(searchModelUrl, {
    headers: this.header});
  }

  removeVehicule(idVehicule : number) : Observable<any> {
    const searchModelUrl = `${this.baseUrluser}/deleteById/${idVehicule}`;
    return this.http.delete(searchModelUrl, {
      headers: this.header, responseType: 'text'});


  }
getmarquevehicule(idvehicule : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/vehicules/${idvehicule}/marque`;
  return this.http.get(searchModelUrl, {
    headers: this.header});

}

getvehiculebyid(idvehicule : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/getVehicule/${idvehicule}`;
  return this.http.get(searchModelUrl, {
    headers: this.header});

}

getclient(): Observable<any> {

  return this.http.get(this.baseUrluser + '/getVehiculeOfClient'  , {
    headers: this.header});
}
getListVehicule(): Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/getlistVehicule`;
  return this.http.get(searchModelUrl, {
    headers: this.header});
  }
  getListVehiculeModel(name:string): Observable<any> {

    const searchModelUrl = `${this.baseUrluser}/getlistVehiculeMarque/${name}`;
    return this.http.get(searchModelUrl, {
      headers: this.header});
    }
addvehiculewithphto(vehicule : Vehicule ,currentfile: File): Observable<Vehicule> {
 const formData: FormData = new FormData();

    // tslint:disable-next-line: align
 formData.append('file', currentfile);
    // tslint:disable-next-line: align
  return this.http.post<Vehicule>(this.baseUrluser + '/addvehiculewithphoto/'  + `${vehicule.model.id}` + "/" + `${vehicule.date_immatriculation}` + "/" + `${vehicule.date_assurance}`

  + "/" + `${vehicule.immatriculation}` + "/" + `${vehicule.assureur}` + "/" + `${vehicule.num_contrat_assurance}`+ "/" + `${vehicule.type_vehicule}` + "/" + `${vehicule.carburant}`

    , formData  );

}


}




interface GetResponseModels {
  _embedded : {
    vehicule_models : VehiculeModel[];
  }
}
  // tslint:disable-next-line: align
  interface GetResponseMarque{
    _embedded: {
      marque : VehiculeMarque[];
    }
  }

  // tslint:disable-next-line: align
  interface GetResponseVehicules {
    _embedded : {
      vehicules : Vehicule[];
    }
  }

