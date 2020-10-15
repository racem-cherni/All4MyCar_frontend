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

getnbrdemandesinscriptionsnotifs(): Observable<any> {

  return this.http.get(this.baseUrluser + '/getnbrdemandesinscriptionsnotifications', {
    headers: this.header});
}
getPrestataire(): Observable<any> {

  return this.http.get(this.baseUrluser + '/getprestataireinactifs', {
    headers: this.header});
}

getClientinscripnotifs(): Observable<any> {

  return this.http.get(this.baseUrluser + '/getclientsinactifsnotifications', {
    headers: this.header});
}

getprestatairesinscripnotifs(): Observable<any> {

  return this.http.get(this.baseUrluser + '/getprestataireinactifsnotifications', {
    headers: this.header});
}

setdemandesinsriptsnotifications(): Observable<any> {

  return this.http.put(this.baseUrluser + '/setdemandesnotifications', {
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

detailclient(idclient : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/getClientbyid/${idclient}`;
  return this.http.get(searchModelUrl, {headers: this.header});


}

detailprestataire(idpres : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/getPrestatairebyid/${idpres}`;
  return this.http.get(searchModelUrl, {headers: this.header});


}

getallclientsbydateinscription(dateinscrip : Date) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/getallClientbydateinscription/${dateinscrip}`;
  return this.http.get(searchModelUrl, {headers: this.header});


}

getallprestatairesbydateinscription(dateinscrip : Date) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/getallprestatairesbydateinscription/${dateinscrip}`;
  return this.http.get(searchModelUrl, {headers: this.header});


}

getallprestatairesbyspecialisations(specialisations : String ) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/getallprestatairesbyspecialisations/${specialisations}`;
  return this.http.get(searchModelUrl, {headers: this.header});


}


}
