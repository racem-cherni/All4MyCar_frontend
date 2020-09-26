import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor(private http: HttpClient , private token: TokenStorageService) { }

  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
});
private baseUrluser = 'http://localhost:8081/api';

getpays(): Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/getallpaysadresse`;
  return this.http.get(searchModelUrl, {
    headers: this.header});
  }
  getvillesofpays(idpays : number) : Observable<any> {
    const searchModelUrl = `${this.baseUrluser}/getVillesofpays/${idpays}`;
    return this.http.get(searchModelUrl, {
      headers: this.header});
  }

  getcitiesofville(idville : number) : Observable<any> {
    const searchModelUrl = `${this.baseUrluser}/getcitesofville/${idville}`;
    return this.http.get(searchModelUrl, {
      headers: this.header});
  }
}
