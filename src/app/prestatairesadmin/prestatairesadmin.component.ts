import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Prestataire } from '../entities/prestataire';
import { AdminService } from '../_services/admin.service';
@Component({
  selector: 'app-prestatairesadmin',
  templateUrl: './prestatairesadmin.component.html',
  styleUrls: ['./prestatairesadmin.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PrestatairesadminComponent implements OnInit {
  prestataireDialog: boolean;


  constructor(private adminservice :AdminService, private confirmationService: ConfirmationService, private messageService: MessageService) { }
  press: Prestataire;
  prestataire:Prestataire[] = [];
  ngOnInit(): void {
    this.adminservice.getAllPrestataire()
    .subscribe((data) => {this.prestataire = data, console.log(data)} , error => console.log(error));
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

}
