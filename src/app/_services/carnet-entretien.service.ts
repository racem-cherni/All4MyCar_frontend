import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarburantCarnet } from '../entities/carburant-carnet';
import { DepenseCarnet } from '../entities/depense-carnet';
import { EntretienCarnet } from '../entities/entretien-carnet';
import { OdometerCarnet } from '../entities/odometer-carnet';
import { TrajetCarnet } from '../entities/trajet-carnet';
import { Vehicule } from '../entities/vehicule';

import { TokenStorageService } from './token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CarnetEntretienService {




  constructor(private http: HttpClient, private token: TokenStorageService) { }
  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
  });

  private baseUrluser = 'http://localhost:8081/api';


  ajouter_carburant(carburant: CarburantCarnet): Observable<any> {
    return this.http.post(this.baseUrluser + '/ajouter_carburant/', carburant
      , { headers: this.header });
  }

  ajouter_entretien(entretien: EntretienCarnet): Observable<any> {
    return this.http.post(this.baseUrluser + '/ajouter_entretien/', entretien
      , { headers: this.header });
  }

  ajouter_depense(depense: DepenseCarnet): Observable<any> {
    return this.http.post(this.baseUrluser + '/ajouter_depense/', depense
      , { headers: this.header });
  }

  ajouter_trajet(trajet: TrajetCarnet): Observable<any> {
    return this.http.post(this.baseUrluser + '/ajouter_trajet/', trajet
      , { headers: this.header });
  }

  ajouter_odometer(odometer: OdometerCarnet): Observable<any> {
    return this.http.post(this.baseUrluser + '/ajouter_odometer/', odometer
      , { headers: this.header });
  }
  getAllHistorique(): Observable<any> {

    return this.http.get(this.baseUrluser + '/gethistorique', {
      headers: this.header
    });
  }
  getPremiersHistorique(): Observable<any> {

    return this.http.get(this.baseUrluser + '/getpremiershistorique', {
      headers: this.header
    });
  }
  getHistoriqueByVehicule(id: number): Observable<any> {

    return this.http.get(this.baseUrluser + '/gethistoriquebyVehicule/' + `${id}`, {
      headers: this.header
    });
  }

  getCarburantParPeriode(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getCarburantParPeriode/' + `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }

  getEntretienParPeriode(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getEntretienParPeriode/' + `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }

  getOdometerParPeriode(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getOdometerParPeriode/' + `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }

  getDepenseParPeriode(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getDepenseParPeriode/' + `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }

  getTrajetParPeriode(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getTrajetParPeriode/' + `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }


  getDepense_carburantMois(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getDepense_carburantMois/' +  `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }

  getRemplis_carburantMois(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getRemplis_carburantMois/' +  `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }


  getNbr_entretienMois(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getNbr_entretienMois/' +  `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }

  getDepense_entretienMois(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getDepense_entretienMois/' +  `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }
  //////
  getKilometrage_jour(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getKilometrage_jour/' +  `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }

  getKilometrage_semaine(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getKilometrage_semaine/' +  `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }

  getKilometrage_mois(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getKilometrage_mois/' +  `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }

  getKilometrage_annee(idvehicule: number, periode: String): Observable<any> {
    return this.http.get(this.baseUrluser + '/getKilometrage_annee/' +  `${idvehicule}` + "/" + `${periode}`, {
      headers: this.header
    });
  }

  removehistorique(idhistorique : number) : Observable<any> {
    const searchModelUrl = `${this.baseUrluser}/deletehistorique/${idhistorique}`;
    return this.http.delete(searchModelUrl, {
      headers: this.header, responseType: 'text'});


  }
  removecarburant(idcarburant : number) : Observable<any> {
    const searchModelUrl = `${this.baseUrluser}/deletecarburant/${idcarburant}`;
    return this.http.delete(searchModelUrl, {
      headers: this.header, responseType: 'text'});
}
removeentretien(identretien : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/deleteentretien/${identretien}`;
  return this.http.delete(searchModelUrl, {
    headers: this.header, responseType: 'text'});
}
removetrajet(idtrajet : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/deletetrajet/${idtrajet}`;
  return this.http.delete(searchModelUrl, {
    headers: this.header, responseType: 'text'});
}
removeodometer(idodometer : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/deleteodometer/${idodometer}`;
  return this.http.delete(searchModelUrl, {
    headers: this.header, responseType: 'text'});
}
removedepense(iddepense : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/deletedepense/${iddepense}`;
  return this.http.delete(searchModelUrl, {
    headers: this.header, responseType: 'text'});
}

}
