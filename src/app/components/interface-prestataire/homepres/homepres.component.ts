import { Component, OnInit } from '@angular/core';
import { RdvpresComponent } from '../rdvpres/rdvpres.component';

@Component({
  selector: 'app-homepres',
  templateUrl: './homepres.component.html',
  styleUrls: ['./homepres.component.css']
})
export class HomepresComponent implements OnInit {

  constructor() { }
  private rdvp: RdvpresComponent;
  ngOnInit(): void {
  }

  gotordv(){
    window.location.href ='/All4MyCar/prestataire/rdv';

this.rdvp.refrech();
  }

}
