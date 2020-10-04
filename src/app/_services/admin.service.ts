import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../entities/client';
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

removeuserclient(idclient : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/deleteuserclient/${idclient}`;
  return this.http.delete(searchModelUrl, {
    headers: this.header, responseType: 'text'});


}

removeuserprestataire(idpres : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/deleteuserprestataire/${idpres}`;
  return this.http.delete(searchModelUrl, {
    headers: this.header, responseType: 'text'});


}

activateuserclient(idclient : number): Observable<any>{
  const searchModelUrl = `${this.baseUrluser}/adduserclient/${idclient}`;
  return this.http.post(searchModelUrl, {
    headers: this.header});

}

submitevehicule(idclient: number): Observable<Client>{
  return this.http.post<Client>(`${this.baseUrluser}/adduserclient/${idclient}`,{
    headers: this.header});
}


activateuserprestataire(idpres : number): Observable<any>{
  const searchModelUrl = `${this.baseUrluser}/adduserprestataire/${idpres}`;
  return this.http.post(searchModelUrl, {
    headers: this.header});

}
getAllPrestataire(): Observable<any> {

  return this.http.get(this.baseUrluser + '/getAllPrestataire', {
    headers: this.header});
}
getAllClient(): Observable<any> {

  return this.http.get(this.baseUrluser + '/getAllClient', {
    headers: this.header});
}
removeprestataire(idpres : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/deleteprestataire/${idpres}`;
  return this.http.delete(searchModelUrl, {
    headers: this.header, responseType: 'text'});


}
removeclient(idclient : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/deleteclient/${idclient}`;
  return this.http.delete(searchModelUrl, {
    headers: this.header, responseType: 'text'});


}


}
