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
  carburantDialog: boolean;
  trajetDialog: boolean;
  odometerDialog: boolean;
  depenseDialog: boolean;

  date_entretienn: Date;
  

  date_depensee: Date;
  

  date_carburantt: Date;
 


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
  form_entretien : FormGroup;
  form_carburant : FormGroup;
  form_trajet : FormGroup;
  form_depense : FormGroup;
  form_odometer : FormGroup;

  formErrors = {

};
validationMessages = {
};

  constructor(private fb: FormBuilder,private clientService: ClientService , private vehiculesService: VehiculesService , private specialisationService: SpecialisationService) { }

  ngOnInit(): void {
    this.date_entretienn = (new Date());
    this.date_carburantt = (new Date());
    this.date_depensee = (new Date());

    this.CreateVehiculeForm();

    this.CreateForm_entretien();
    this.CreateForm_carburant();
    this.CreateForm_trajet();
    this.CreateForm_depense();
    this.CreateForm_odometer();


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

  ////////////////////////////////////// create form /////////////////////////////////////////
  CreateVehiculeForm(){
    this.form = this.fb.group({
      vehicule: [''],
      specialisations: [''],


    });
    this.form.valueChanges
.subscribe(data => this.onValueChanged(data));

this.onValueChanged();
  }

  CreateForm_entretien() {
    this.form_entretien = this.fb.group({
  date_entretien: [''],
  centre_entretien: [''],
  prix_entretien: [''],
  note_entretien: [''],
  specialisations: [''],

    });
    this.form_entretien.valueChanges
.subscribe(data => this.onValueChanged_entretien(data));

// tslint:disable-next-line: align
this.onValueChanged_entretien();
  }

  CreateForm_carburant() {
    this.form_carburant = this.fb.group({



      date_carburant: [''],
      station_carburant: [''],
      quantite_carburant: [''],
      depense_carburant: [''],
      odometer_carburant: [''],
      note_carburant: [''],


    });
    this.form_carburant.valueChanges
.subscribe(data => this.onValueChanged_carburant(data));

// tslint:disable-next-line: align
this.onValueChanged_carburant();
  }


  CreateForm_odometer() {
    this.form_odometer = this.fb.group({
          date_odometer: [''],
          odomoeter_cal: [''],
          note_odometer: [''],

    });
    this.form_odometer.valueChanges
.subscribe(data => this.onValueChanged_odometer(data));

// tslint:disable-next-line: align
this.onValueChanged_odometer();
  }



  CreateForm_depense() {
    this.form_depense = this.fb.group({


      date_depense: [''],
      prix_depense: [''],
      note_depense: [''],
      odometer_depense: [''],

    });
    this.form_depense.valueChanges
.subscribe(data => this.onValueChanged_depense(data));

// tslint:disable-next-line: align
this.onValueChanged_depense();
  }
  CreateForm_trajet() {
    this.form_trajet = this.fb.group({
      heure_depart: [''],
      date_depart : [''],
      lieux_depart : [''],

      heure_arrive: [''],
      date_arrive : [''],
      lieux_arrive: [''],
      taxe_trajet: [''],
      note_trajet: [''],
      distance_trajet: [''],
      duree_trajet: [''],
      vitesse_trajet: [''],

    });
    this.form_trajet.valueChanges
.subscribe(data => this.onValueChanged_trajet(data));

// tslint:disable-next-line: align
this.onValueChanged_trajet();
  }
///////////////////////////////////////////////////////////////////////////////////////////





  ///////////////////////////////////// onValueChanged ///////////////////////////////////
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



  onValueChanged_entretien(data?: any) {
    if (!this.form_entretien) { return; }
    const form = this.form_entretien;
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


  onValueChanged_odometer(data?: any) {
    if (!this.form_odometer) { return; }
    const form = this.form_odometer;
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



  onValueChanged_carburant(data?: any) {
    if (!this.form_carburant) { return; }
    const form = this.form_carburant;
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

  onValueChanged_trajet(data?: any) {
    if (!this.form_trajet) { return; }
    const form = this.form_trajet;
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



  onValueChanged_depense(data?: any) {
    if (!this.form_depense) { return; }
    const form = this.form_depense;
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
///////////////////////////////////////////////////////////////////////////////







  //////////////////////ON SUBMIT/////////////////////////////////////////////
  onsubmit(){
    this.form.value.vehicule = this.selectvec;
    this.form.value.specialisations = this.selectspec ;

     console.log(this.form.value);


   }

   onsubmit_entretien(){
   }

   onsubmit_carburant(){
  }
  onsubmit_depense(){
  }
  onsubmit_trajet(){
  }
  onsubmit_odometer(){
  }


///////////////////////////////////////////////////////////////////////////






/////////////////////////////hide & affiche dialogue ////////////////////////////////////
  hideentretienDialog() {
    this.entretienDialog = false;
  }
  afficherentretiendialog() {
    this.entretienDialog = true;
  }


  hidecarburantDialog() {
    this.carburantDialog = false;
  }
  affichercarburantDialog() {
    this.carburantDialog = true;
  }


  hidetrajetDialog() {
    this.trajetDialog = false;
  }
  affichertrajetDialog() {
    this.trajetDialog = true;
  }


  hidedepenseDialog() {
    this.depenseDialog = false;
  }
  afficherdepenseDialog() {
    this.depenseDialog = true;
  }


  hideodometerDialog() {
    this.odometerDialog = false;
  }
  afficherodometerDialog() {
    this.odometerDialog = true;
  }



}
/////////////////////////////////////////////////////////////////////////////