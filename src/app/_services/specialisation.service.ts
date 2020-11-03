import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialisationService {

  constructor(private http: HttpClient , private token: TokenStorageService) { }
  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
});
private baseUrluser = 'http://localhost:8081/api';


getspecialisations(): Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/getSpecialisations`;
  return this.http.get(searchModelUrl, {
    headers: this.header});
  }
  getdetailspecialisation(idspecialisation : number) : Observable<any> {
    const searchModelUrl = `${this.baseUrluser}/getdetailspecialisation/${idspecialisation}`;
    return this.http.get(searchModelUrl, {
      headers: this.header});
  }

  getdetailspecialisationn() : Observable<any> {
    const searchModelUrl = `${this.baseUrluser}/getdetailspecialisationn`;
    return this.http.get(searchModelUrl, {
      headers: this.header});
  }
}
