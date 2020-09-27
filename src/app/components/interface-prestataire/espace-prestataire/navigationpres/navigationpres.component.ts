import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigationpres',
  templateUrl: './navigationpres.component.html',
  styleUrls: ['./navigationpres.component.css']
})
export class NavigationpresComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  // tslint:disable-next-line: typedef
  gotogarage()
  {this.router.navigate(['All4MyCar/prestataire/espace-prestataire/garage']);
}

gotodisponibilte(){
  this.router.navigate(['All4MyCar/prestataire/espace-prestataire/disponibilte']);
}

// tslint:disable-next-line: typedef
gotodashbordpres(){
  this.router.navigate(['All4MyCar/prestataire/espace-prestataire/dashboardpres']);
}

// tslint:disable-next-line: typedef
gotoprofilpres(){
this.router.navigate(['All4MyCar/prestataire/espace-prestataire/profilpres']);
}


}
