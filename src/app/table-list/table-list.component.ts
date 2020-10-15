
import { Component, OnInit, ViewChild,} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { Client } from '../entities/client';
import { Prestataire } from '../entities/prestataire';
import { User } from '../entities/user';
import { AdminService } from '../_services/admin.service';
import {MessageService} from 'primeng/api';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [MessageService]
})
export class TableListComponent implements OnInit {
  constructor(private adminservice: AdminService,private messageService: MessageService) { }
  press: Prestataire;
  clientDialog: boolean;
  cltt: Client;
  @ViewChild('dt') table: Table;


  loading: boolean = true;
  prestataireDialog: boolean;

userclient: Client[]= null;
userprestataire: Prestataire[]= null ;
checked: boolean = false;
formErrors = {


};

validationMessages = {

};


  form: FormGroup;
  isSuccessful = false;

  ngOnInit() {
    this.adminservice.getClientt()
    .subscribe((data) => {this.userclient = data, console.log(data), this.loading = false;} , error => console.log(error));
    this.adminservice.getPrestataire()
    .subscribe((data) => {this.userprestataire = data, console.log(data), this.loading = false;} , error => console.log(error));

  }

  activateclient(idclt: number){
    this.adminservice.activateuserclient(idclt).subscribe(data => { this.userclient = data ,
      console.log(data);
    });
    this.clientDialog = false;
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Client ajouté '});

  }
  activateprestataire(idpres: number){
    this.adminservice.activateuserprestataire(idpres).subscribe(data => { this.userprestataire = data ,
      console.log(data);

    });

    this.prestataireDialog = false;
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Prestataire ajouté '});

  }
  refuseclient(idclt: number){
      this.adminservice.removeuserclient(idclt).subscribe(data => {
        console.log(data);
        this.ngOnInit();
      });
}
  refuseprestataire(idpres: number){
    this.adminservice.removeuserprestataire(idpres).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }


  profilprestataire(prestataire: Prestataire){
    this.press = prestataire ;
   this.prestataireDialog = true;

 }

 profilclient(client: Client){
  this.cltt = client ;
 this.clientDialog = true;

}

 hidepresDialog() {
  this.prestataireDialog = false;
}

hidecltDialog() {
  this.clientDialog = false;
}



}
