import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Prestataire } from '../entities/prestataire';
import { Observable } from 'rxjs';
import { Disponibilte } from '../entities/disponibilte';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PrestataireService {

  constructor(private http: HttpClient, private token: TokenStorageService) { }
  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
});

private baseUrluser = 'http://localhost:8081/api';

prestataire: Prestataire ;

getUser(): Observable<any> {

  return this.http.get(this.baseUrluser + '/FinduserrById', {
    headers: this.header});
}

getprestataire(): Observable<any> {

  return this.http.get(this.baseUrluser + '/FindpresById/'  , {
    headers: this.header});
}

edit_prestataire(prestataire): Observable<any> {

  return this.http.post(this.baseUrluser + '/edit_prestataire', {
    firstNamepres: prestataire.firstNamepres,
    lastNamepres: prestataire.lastNamepres,
    adressepres: prestataire.adressepres,
    adresseprof: prestataire.adresseprof,
    emailpres: prestataire.emailpres,

   // datepermis: client.datepermis,

    telpres: prestataire.telpres,

    photopres: prestataire.photopres
  }, httpOptions);
}




submiteditprofil(prestataire: Prestataire, currentfile: File): Observable<Prestataire> {
  const formData: FormData = new FormData();

    // tslint:disable-next-line: align
    formData.append('file', currentfile);
    // tslint:disable-next-line: align
  return this.http.post<Prestataire>(this.baseUrluser + '/edit_prestataire1/'  + `${prestataire.firstNamepres}`  + "/" + `${prestataire.lastNamepres}` + "/" + `${prestataire.adressepres}`

   + "/" + `${prestataire.emailpres}` + "/" + `${prestataire.telpres}`+ "/" + `${prestataire.specialisations}`+ "/" + `${prestataire.cin}` , formData

    ,  {headers: this.header} );

}

submiteditprofilwithoutphoto(prestataire: Prestataire): Observable<Prestataire> {
  return this.http.post<Prestataire>(this.baseUrluser + '/edit_prestataire12/'  + `${prestataire.firstNamepres}`  + "/" + `${prestataire.lastNamepres}` + "/" + `${prestataire.adressepres}`

   + "/" + `${prestataire.emailpres}` + "/" + `${prestataire.telpres}`+ "/" + `${prestataire.specialisations}`+ "/" + `${prestataire.cin}`

    ,  {headers: this.header} );
}



getDisponibilte() : Observable<any> {
  return this.http.get(this.baseUrluser + '/FinddispoByPres/'  , {
    headers: this.header});
}

modif_dispo(disponibilte: Disponibilte): Observable<any> {
  return this.http.post( this.baseUrluser + '/modifier_dispojour/' /*+ `${disponibilte.heuredam}`+"/"+
  `${disponibilte.heurefam}`+"/"+`${disponibilte.heuredm}`+"/"+`${disponibilte.heurefm}`+"/"
  +`${disponibilte.jour}`+"/"+`${disponibilte.jour_actif}`*/ ,disponibilte
  ,{ headers: this.header});
}


submiteditprofil_completeprofil(prestataire: Prestataire, currentfile: File,images :FileList): Observable<Prestataire> {
  const formData: FormData = new FormData();

    // tslint:disable-next-line: align
    formData.append('file', currentfile);
    for(let i=0; i<images.length; i++){
      const file= images[i];
    formData.append('images[]', file, file.name);
    }
    // tslint:disable-next-line: align
  return this.http.post<Prestataire>(this.baseUrluser + '/ajoutprofilpres_sansverif/'  + `${prestataire.firstNamepres}`  + "/" + `${prestataire.lastNamepres}` + "/" + `${prestataire.adressepres}`

   + "/" + `${prestataire.emailpres}` + "/" + `${prestataire.telpres}`+ "/" + `${prestataire.specialisations}`+ "/" + `${prestataire.cin}` , formData

    ,  {headers: this.header} );

}

}
