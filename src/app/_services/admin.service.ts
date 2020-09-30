import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private token: TokenStorageService) { }
  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
});



private baseUrluser = 'http://localhost:8081/api';

//client: Client ;

getClientt(): Observable<any> {

  return this.http.get(this.baseUrluser + '/getclientsinactifs', {
    headers: this.header});
}
getPrestataire(): Observable<any> {

  return this.http.get(this.baseUrluser + '/getprestataireinactifs', {
    headers: this.header});
}

getadmin(): Observable<any> {

  return this.http.get(this.baseUrluser + '/Findadmin'  , {
    headers: this.header});
}
}
