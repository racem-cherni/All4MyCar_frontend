import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../entities/client';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private token: TokenStorageService) { }
  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
});



private baseUrluser = 'http://localhost:8081/api';

client: Client ;

getUser(): Observable<any> {

  return this.http.get(this.baseUrluser + '/FinduserById', {
    headers: this.header});
}

getclient(): Observable<any> {

  return this.http.get(this.baseUrluser + '/FindclientById/'  , {
    headers: this.header});
}

edit_client(client): Observable<any> {
  return this.http.post(this.baseUrluser + '/edit_client', {
    firstNameclt: client.firstNameclt,
    emailclt: client.emailclt,
    CIN: client.CIN,
    datepermis: client.datepermis,
    lastNameclt: client.lastNameclt,
    telclt: client.telclt,
    adresseclt: client.adresseclt,
    photoclt: client.photoclt
  }, httpOptions);
}

submiteditprofil(client: Client): Observable<Client> {
  return this.http.put<Client>(this.baseUrluser + '/edit_client' , client, httpOptions);
}

}



