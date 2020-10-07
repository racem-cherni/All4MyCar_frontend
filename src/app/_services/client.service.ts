import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../entities/client';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

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

getUserr(id : number): Observable<any> {

  return this.http.get(this.baseUrluser + '/Finduserr/'+`${id}`, {
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

submiteditprofil_completeprofil(client: Client, currentfile: File,images :FileList): Observable<Client> {
  const formData: FormData = new FormData();

    // tslint:disable-next-line: align
    formData.append('file', currentfile);
    for(let i=0; i<images.length; i++){
      const file= images[i];
    formData.append('images[]', file, file.name);
    }
    console.log(formData);

    

    // tslint:disable-next-line: align
  return this.http.post<Client>(this.baseUrluser + '/ajoutclt_sansverif/'  + `${client.firstNameclt}`  + "/" + `${client.lastNameclt}` + "/" + `${client.emailclt}`

  + "/" + `${client.adresseclt}` + "/" + `${client.telclt}` + "/" + `${client.cin}` + "/" + `${client.date_permis}` , formData

    ,  {headers: this.header} );

}
submiteditprofilwithoutphoto(client: Client): Observable<Client> {
  

    // tslint:disable-next-line: align
   
    // tslint:disable-next-line: align
  return this.http.post<Client>(this.baseUrluser + '/edit_client12/'  + `${client.firstNameclt}`  + "/" + `${client.lastNameclt}` + "/" + `${client.emailclt}`

  + "/" + `${client.adresseclt}` + "/" + `${client.telclt}` + "/" + `${client.cin}` + "/" + `${client.date_permis}` 

    ,  {headers: this.header} );

}


submiteditprofilwithoutphoto_completeprofil(client: Client): Observable<Client> {
  

  // tslint:disable-next-line: align
 
  // tslint:disable-next-line: align
return this.http.post<Client>(this.baseUrluser + '/ajoutclt_sansverif2/'  + `${client.firstNameclt}`  + "/" + `${client.lastNameclt}` + "/" + `${client.emailclt}`

+ "/" + `${client.adresseclt}` + "/" + `${client.telclt}` + "/" + `${client.cin}` + "/" + `${client.date_permis}` 

  ,  {headers: this.header} );

}

}



