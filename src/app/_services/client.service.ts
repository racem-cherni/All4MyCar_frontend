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

  return this.http.get(this.baseUrluser + '/FindclientById'  , {
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




submiteditprofil(client: Client, currentfile: File): Observable<Client> {
  const formData: FormData = new FormData();

    // tslint:disable-next-line: align
    formData.append('file', currentfile);
    // tslint:disable-next-line: align
  return this.http.post<Client>(this.baseUrluser + '/edit_client1/'  + `${client.firstNameclt}`  + "/" + `${client.lastNameclt}` + "/" + `${client.emailclt}`

  + "/" + `${client.adresseclt}` + "/" + `${client.telclt}` + "/" + `${client.cin}` + "/" + `${client.date_permis}` , formData

    ,  {headers: this.header} );

}

}



