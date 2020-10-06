import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Client } from '../entities/client';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-clientsadmin',
  templateUrl: './clientsadmin.component.html',
  styleUrls: ['./clientsadmin.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ClientsadminComponent implements OnInit {
  clientDialog: boolean;
  loading: boolean = true;
  @ViewChild('dt') table: Table;


  constructor(private adminservice :AdminService, private confirmationService: ConfirmationService, private messageService: MessageService) { }
  client:Client[] = [];
  clientsbydate:Client[] = [];

  cltt: Client;
  ngOnInit(): void {
    this.adminservice.getAllClient()
    .subscribe((data) => {this.client = data, console.log(data), this.loading = false; } ,error => console.log(error));
  }
  deleteclient(client: Client) {
    this.confirmationService.confirm({
        message: 'Etes-vous sûr que vous voulez supprimer  ' + client.firstNameclt  +' ' +client.lastNameclt + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.adminservice.removeclient(client.id).subscribe(data => {
            console.log(data);
            this.ngOnInit();
          });
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Client Supprimé', life: 3000});
        }
    });
  }
  profilclient(client: Client){
    this.cltt = client ;
   this.clientDialog = true;

 }










 getallclientsbydate(d){
  this.adminservice.getallclientsbydateinscription(d)
  .subscribe((data) => {this.client = data, console.log(data)} , error => console.log(error));
 }

 cleartable(){
  this.ngOnInit();
 }

}
