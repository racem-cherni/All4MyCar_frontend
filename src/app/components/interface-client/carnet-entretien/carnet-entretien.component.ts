import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Client } from 'src/app/entities/client';
import { DetailSpecialisation } from 'src/app/entities/detail-specialisation';
import { Specialisation } from 'src/app/entities/specialisation';
import { Vehicule } from 'src/app/entities/vehicule';
import { ClientService } from 'src/app/_services/client.service';
import { SpecialisationService } from 'src/app/_services/specialisation.service';
import { VehiculesService } from 'src/app/_services/vehicules.service';

@Component({
  selector: 'app-carnet-entretien',
  templateUrl: './carnet-entretien.component.html',
  styleUrls: ['./carnet-entretien.component.css']
})
export class CarnetEntretienComponent implements OnInit {

  entretienDialog: boolean;
  Vehicules: Vehicule[] = [];
  clientt: Client;
  selectedVehicule: Vehicule ;
  specialisations: Specialisation[] = [];
  detailsspecialisation: DetailSpecialisation[] = [];
  selectedMarque: DetailSpecialisation[] = null;
  selectedModel : DetailSpecialisation;
    detailss: DetailSpecialisation[] = [];
    depences: string[] = ['Vignette' , 'Assurance' , 'Visite technique' ,'Accessoires'];
  form: FormGroup;
  formErrors = {

};
validationMessages = {
};

  constructor(private fb: FormBuilder,private clientService: ClientService , private vehiculesService: VehiculesService , private specialisationService: SpecialisationService) { }

  ngOnInit(): void {
    this.CreateVehiculeForm();

    this.clientt = new Client();
    this.clientService.getclient()
     .subscribe((data) => {this.clientt = data, console.log(typeof(data.date_inscrip)),
      this.vehiculesService.getVehiculess().subscribe((data) => {
        this.Vehicules = data,  console.log(data)} ,

        error => console.log(error));
    } , error => console.log(error));
    this.specialisationService.getspecialisations()
   .subscribe((data) => {this.specialisations = data, console.log(data); });
  }
  selectvec: Vehicule;
  selectspec: DetailSpecialisation[] = [];
  selectAge: Specialisation;
  selectmodelx : DetailSpecialisation;
  getVehicule(){

    this.selectvec = this.selectedVehicule;
    console.log(this.selectvec);


  }
  getspec(){

    this.selectspec = this.selectedMarque ;
    console.log(this.selectspec);

  }
  setModelValue(){
    this.selectmodelx = this.selectedModel;
    console.log(this.selectmodelx);

  }
  CreateVehiculeForm(){
    this.form = this.fb.group({
      vehicule: [''],
      specialisations: [''],


    });
    this.form.valueChanges
.subscribe(data => this.onValueChanged(data));

// tslint:disable-next-line: align
this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onsubmit(){
    this.form.value.vehicule = this.selectvec;
    this.form.value.specialisations = this.selectspec ;

     console.log(this.form.value);


   }
  hideentretienDialog() {
    this.entretienDialog = false;
  }
  afficherentretiendialog() {
    this.entretienDialog = true;
  }



}
