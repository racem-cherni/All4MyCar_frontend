import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Garage } from '../entities/garage';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  constructor(private http: HttpClient, private token: TokenStorageService) { }
  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
});

private baseUrluser = 'http://localhost:8081/api';

submiteditgarage(prestataire: Garage ,currentfile: File): Observable<Garage> {
  const formData: FormData = new FormData();

    // tslint:disable-next-line: align
   formData.append('file', currentfile);
    // tslint:disable-next-line: align
  return this.http.post<Garage>(this.baseUrluser + '/addgaragee/'  + `${prestataire.Nbr_Mecaniciens}`  + "/" + `${prestataire.date_ouverture}` + "/" + `${prestataire.année_Experience}`

   + "/" + `${prestataire.addresse}`+"/"+`${prestataire.adressecite.id}`+"/"+`${prestataire.description}`



   , formData  ,  {headers: this.header} );

}
getGarage(): Observable<any> {

  return this.http.get(this.baseUrluser + '/getgarage'  , {
    headers: this.header});
}
}
