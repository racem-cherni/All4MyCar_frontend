import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from 'src/app/_services/transfer.service';

@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-client.component.html',
  styleUrls: ['./espace-client.component.css']
})
export class EspaceClientComponent implements OnInit {
  message:number;

  constructor(private transfereService:TransferService,
    private router:Router) { }
  position : number ;

  ngOnInit(): void {
    this.transfereService.currentMessage.subscribe(message => this.message = message)

    console.log("espace"+this.message);
    if (this.router.url.indexOf('/All4MyCar/client/espace-client/dashboard') > -1) {


    this.position=1;
    }
else if (this.router.url.indexOf('/All4MyCar/client/espace-client/profil') > -1){
  this.position=3;
  }

}

  gotovehicules(){
    this.position=2;

  }
  public gotoprofil(){
    this.position=3;

  }

  gotodashboard(){
    this.position=1;
  }
  gotocarnetentretien(){
    this.position=4;

  }

}
