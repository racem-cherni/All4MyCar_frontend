import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  gotovehicules()
  {this.router.navigate(['All4MyCar/client/espace-client/vehicules']);
}

// tslint:disable-next-line: typedef
gotodashbord(){
  this.router.navigate(['All4MyCar/client/espace-client/dashboard']);
}

// tslint:disable-next-line: typedef
gotoprofil(){
this.router.navigate(['All4MyCar/client/espace-client/profil']);
}

gotocarnetentretien(){
  this.router.navigate(['All4MyCar/client/espace-client/carnet-entretien']);

}

}
