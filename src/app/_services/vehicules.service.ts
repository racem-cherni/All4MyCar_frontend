import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';import { Injectable } from '@angular/core';
import { VehiculeMarque } from '../entities/vehicule-marque';
import { Observable } from 'rxjs';
import { VehiculeModel } from '../entities/vehicule-model';
import { map } from 'rxjs/operators';


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
private marqueUrl = 'http://localhost:8081/api/marque';


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


}

interface GetResponseModels {
  _embedded : {
    vehicule_models : VehiculeModel[];
  }
}
  interface GetResponseMarque{
    _embedded : {
      marque : VehiculeMarque[];
    }
  }

