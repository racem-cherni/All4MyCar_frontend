import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/layout/header/header.component';

@Component({
  selector: 'app-espace-prestataire',
  templateUrl: './espace-prestataire.component.html',
  styleUrls: ['./espace-prestataire.component.css']
})
export class EspacePrestataireComponent implements OnInit {

  constructor(  private router:Router) { }
  position : number =null;

  ngOnInit(): void {
    
    if (this.router.url.indexOf('/All4MyCar/prestataire/espace-prestataire/dashboardpres') > -1) {
       
    
      this.position=1;
      }
  else if (this.router.url.indexOf('/All4MyCar/prestataire/espace-prestataire/profilpres') > -1){
    this.position=3;
    }  }  

    gotodisponibilte(){
      this.position=4;
    }

  gotogarage(){
    this.position=2;

  }
  gotoprofilpres(){
    this.position=3;

  }

  gotodashboard(){
    this.position=1;
  }

}
