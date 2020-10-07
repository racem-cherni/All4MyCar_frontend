import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Prestataire } from '../entities/prestataire';
import { Specialisation } from '../entities/specialisation';
import { AdminService } from '../_services/admin.service';
import { SpecialisationService } from '../_services/specialisation.service';
@Component({
  selector: 'app-prestatairesadmin',
  templateUrl: './prestatairesadmin.component.html',
  styleUrls: ['./prestatairesadmin.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PrestatairesadminComponent implements OnInit {

  selectedspecialities: string;

  specialisationss: Specialisation[] = [];
  prestataireDialog: boolean;
  loading: boolean = true;
  @ViewChild('dt') table: Table;


  constructor(private adminservice :AdminService, private confirmationService: ConfirmationService, private messageService: MessageService,private specialisationService: SpecialisationService) { }
  press: Prestataire;
  prestataire:Prestataire[] = [];
  ngOnInit(): void {
    this.adminservice.getAllPrestataire()
    .subscribe((data) => {this.prestataire = data, console.log(data), this.loading = false;} , error => console.log(error));
    this.specialisationService.getspecialisations()
   .subscribe((data) => {this.specialisationss = data, console.log(data); });

  }

  deletepres(pres: Prestataire) {
    this.confirmationService.confirm({
        message: 'Etes-vous sûr que vous voulez supprimer  ' + pres.firstNamepres  +' ' +pres.lastNamepres + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.adminservice.removeprestataire(pres.id).subscribe(data => {
            console.log(data);
            this.ngOnInit();
          });
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Prestataire Supprimé', life: 3000});
        }
    });
  }
  profilprestataire(prestataire: Prestataire){
    this.press = prestataire ;
   this.prestataireDialog = true;

 }

 cleartable(){
  this.ngOnInit();
 }
 getallprestatairesbydate(d){
  this.adminservice.getallprestatairesbydateinscription(d)
  .subscribe((data) => {this.prestataire = data, console.log(data)} , error => console.log(error));
 }

 onRepresentativeChange(event) {
  this.table.filter(event.value, 'specialisations', 'in')
}

getallprestatairesbyspec(){
  if (this.selectedspecialities !== undefined ) {
  this.adminservice.getallprestatairesbyspecialisations(this.selectedspecialities)
  .subscribe((data) => {this.prestataire = data, console.log(data)} , error => console.log(error));
  }else {
    this.adminservice.getAllPrestataire()
    .subscribe((data) => {this.prestataire = data, console.log(data), this.loading = false;} , error => console.log(error));

  }
 }

 cleartablee(){
  this.ngOnInit();
  this.selectedspecialities= undefined;

 }

}
