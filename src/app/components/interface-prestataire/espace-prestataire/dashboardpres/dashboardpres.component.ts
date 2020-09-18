import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prestataire } from 'src/app/entities/prestataire';
import { User } from 'src/app/entities/user';
import { PrestataireService } from 'src/app/_services/prestataire.service';

@Component({
  selector: 'app-dashboardpres',
  templateUrl: './dashboardpres.component.html',
  styleUrls: ['./dashboardpres.component.css']
})
export class DashboardpresComponent implements OnInit {

  constructor(private prestataireservice: PrestataireService , private router: Router , private route: ActivatedRoute) { }
  id: number ;
  prestataire: Prestataire;
  user: User;
  ngOnInit(): void {
    
    // tslint:disable-next-line: no-string-literal
    this.prestataireservice.getUser()
   .subscribe((data) => {this.user = data, console.log(data)} , error => console.log(error));

  // tslint:disable-next-line: align
  this.prestataireservice.getprestataire()
   .subscribe((data) => {this.prestataire = data, console.log(data)} , error => console.log(error));

 }
  }


