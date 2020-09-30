import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/entities/client';
import { User } from 'src/app/entities/user';
import { EspaceClientComponent } from '../espace-client.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private clientservice: ClientService , private router: Router , private espaceclient : EspaceClientComponent, private route: ActivatedRoute) { }
 id: number ;
 client: Client;
 user: User;

  ngOnInit(): void {

    // tslint:disable-next-line: no-string-literal
    this.clientservice.getUser()
   .subscribe((data) => {this.user = data, console.log(data); } , error => console.log(error));

  // tslint:disable-next-line: align
  this.clientservice.getclient()
   .subscribe((data) => {this.client = data, console.log(data); } , error => console.log(error));

 }

 gotoprofil(){
 
  this.router.navigateByUrl('/All4MyCar/prestataire/espace-prestataire/profil');
  this.espaceclient.ngOnInit();
 }
  }


