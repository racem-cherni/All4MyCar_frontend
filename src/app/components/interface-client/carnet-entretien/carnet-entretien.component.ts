import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarburantCarnet } from 'src/app/entities/carburant-carnet';
import { Client } from 'src/app/entities/client';
import { DepenseCarnet } from 'src/app/entities/depense-carnet';
import { DetailSpecialisation } from 'src/app/entities/detail-specialisation';
import { EntretienCarnet } from 'src/app/entities/entretien-carnet';
import { OdometerCarnet } from 'src/app/entities/odometer-carnet';
import { Specialisation } from 'src/app/entities/specialisation';
import { TrajetCarnet } from 'src/app/entities/trajet-carnet';
import { Vehicule } from 'src/app/entities/vehicule';
import { CarnetEntretienService } from 'src/app/_services/carnet-entretien.service';
import { ClientService } from 'src/app/_services/client.service';
import { SpecialisationService } from 'src/app/_services/specialisation.service';
import { VehiculesService } from 'src/app/_services/vehicules.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Historique } from 'src/app/entities/historique';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-carnet-entretien',
  templateUrl: './carnet-entretien.component.html',
  styleUrls: ['./carnet-entretien.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CarnetEntretienComponent implements OnInit {
  Allhistoriquebyvehicule: Historique[]= [];
  Allhistorique: Historique[]= [];
  historique: Historique[]= [];
  entretienDialog: boolean;
  @ViewChild('dt') table: Table;
  carburantDialog: boolean;
  trajetDialog: boolean;
  odometerDialog: boolean;
  editDialog: boolean;
  historiqueDialog: boolean;
  depenseDialog: boolean;
  loading: boolean = true;
  date_entretienn: Date;
  carnet_carbutant : CarburantCarnet;
  carnet_depense : DepenseCarnet;
  carnet_entretien : EntretienCarnet;
  carnet_trajet : TrajetCarnet;
  carnet_odometer : OdometerCarnet;

  date_depensee: Date;


  date_carburantt: Date;

  sysdate : Date= new Date();


  Vehicules: Vehicule[] = [];
  clientt: Client;
  specialisations: Specialisation[] = [];
  specialisationss: String[];
  detailsspecialisation: DetailSpecialisation[] = [];
  selectedModel : DetailSpecialisation;
    detailss: DetailSpecialisation[] = [];
    depences: string[] = ['Fine' , 'Insurance' , 'MOT' ,'Parking','Tax','Toll'];
  form: FormGroup;
  form_entretien : FormGroup;
  form_carburant : FormGroup;
  form_trajet : FormGroup;
  form_depense : FormGroup;
  form_odometer : FormGroup;
  @ViewChild('cform',) carburantFormDirective ;
  @ViewChild('eform') entretienFormDirective ;
  @ViewChild('tform') trajetFormDirective ;
  @ViewChild('oform') odometerFormDirective ;
  @ViewChild('dform') depenseFormDirective ;

  formErrors = {
 // tslint:disable-next-line: object-literal-key-quotes
 'date_carburant': '',
 // tslint:disable-next-line: object-literal-key-quotes
'vehicule': '',
 // tslint:disable-next-line: object-literal-key-quotes
'odometer_carburant': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'quantite_carburant': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'station_carburant': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'depense_carburant': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'date_entretien': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'centre_entretien': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'odometer_entretien': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'specialisations': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'prix_entretien': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'date_depense': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'odometer_depense': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'depense': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'prix_depense': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'date_odometer': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'odomoeter_cal': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'date_depart': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'lieux_depart': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'heure_depart': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'date_arrive': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'lieux_arrive': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'heure_arrive': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'distance_trajet': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'duree_trajet': '',
 // tslint:disable-next-line: object-literal-key-quotes
 'vitesse_trajet': '',
};
validationMessages = {
   // tslint:disable-next-line: object-literal-key-quotes
   'date_carburant': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'la date est nécessaire.',
    // tslint:disable-next-line: object-literal-key-quotes
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'vehicule': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'choisir une vehicule',
    // tslint:disable-next-line: object-literal-key-quotes
  },
    // tslint:disable-next-line: object-literal-key-quotes
    'odometer_carburant': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'inserer le kilometrage',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength': 'au moins 3 lettre'
  },
    // tslint:disable-next-line: object-literal-key-quotes
   'quantite_carburant': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'cin is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'pattern':       'cin must contain only numbers.',
    // tslint:disable-next-line: object-literal-key-quotes
  },
    // tslint:disable-next-line: object-literal-key-quotes
     'station_carburant': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'inserer la station',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':   'cin must contain  3 numbers',
  },
    // tslint:disable-next-line: object-literal-key-quotes
   'depense_carburant': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'inserer le prix totale',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength': 'au moins 3 lettre'
  },
    // tslint:disable-next-line: object-literal-key-quotes
   'date_entretien': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'la date est nécessaire.',
    // tslint:disable-next-line: object-literal-key-quotes
  },
    // tslint:disable-next-line: object-literal-key-quotes
   'centre_entretien': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'inserer le centre de service.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength': 'au moins 3 lettre'
  },
    // tslint:disable-next-line: object-literal-key-quotes
    'odometer_entretien': {
      // tslint:disable-next-line: object-literal-key-quotes
    'required':      'inserer le kilometrage',
    // tslint:disable-next-line: object-literal-key-quotes
  },
    // tslint:disable-next-line: object-literal-key-quotes
   'specialisations': {
   // tslint:disable-next-line: object-literal-key-quotes
  'required':      'inserer entretien',
  // tslint:disable-next-line: object-literal-key-quotes
},
  // tslint:disable-next-line: object-literal-key-quotes
  'prix_entretien': {
   // tslint:disable-next-line: object-literal-key-quotes
   'required':      'inserer le prix totale',
  // tslint:disable-next-line: object-literal-key-quotes
 },
   // tslint:disable-next-line: object-literal-key-quotes
  'date_depense': {
  // tslint:disable-next-line: object-literal-key-quotes
  'required':      'inserer la date',
// tslint:disable-next-line: object-literal-key-quotes'

 },
   // tslint:disable-next-line: object-literal-key-quotes
  'odometer_depense': {
    // tslint:disable-next-line: object-literal-key-quotes
  'required':      'inserer kilometrage',
  // tslint:disable-next-line: object-literal-key-quotes
 },
  // tslint:disable-next-line: object-literal-key-quotes
  'depense': {
    // tslint:disable-next-line: object-literal-key-quotes
  'required':      'choisir depense',
  // tslint:disable-next-line: object-literal-key-quotes
 },
  // tslint:disable-next-line: object-literal-key-quotes
  'prix_depense': {
    // tslint:disable-next-line: object-literal-key-quotes
  'required':      'inserer prix',
  // tslint:disable-next-line: object-literal-key-quotes
 },
  // tslint:disable-next-line: object-literal-key-quotes
  'date_odometer': {
    // tslint:disable-next-line: object-literal-key-quotes
  'required':      'inserer date',
  // tslint:disable-next-line: object-literal-key-quotes
 },
  // tslint:disable-next-line: object-literal-key-quotes
  'odomoeter_cal': {
    // tslint:disable-next-line: object-literal-key-quotes
  'required':      'inserer kilometrage',
  // tslint:disable-next-line: object-literal-key-quotes
 },
  // tslint:disable-next-line: object-literal-key-quotes
  'date_depart': {
  // tslint:disable-next-line: object-literal-key-quotes
'required':      'inserer date depart',
// tslint:disable-next-line: object-literal-key-quotes
},
  // tslint:disable-next-line: object-literal-key-quotes
  'lieux_depart': {
  // tslint:disable-next-line: object-literal-key-quotes
'required':      'inserer lieu depart',
// tslint:disable-next-line: object-literal-key-quotes
'minlength': 'au moins 3 lettre'
// tslint:disable-next-line: object-literal-key-quotes
},
  // tslint:disable-next-line: object-literal-key-quotes
 'heure_depart': {
  // tslint:disable-next-line: object-literal-key-quotes
'required':      'inserer heure depart',
// tslint:disable-next-line: object-literal-key-quotes
},
  // tslint:disable-next-line: object-literal-key-quotes
  'date_arrive': {
  // tslint:disable-next-line: object-literal-key-quotes
'required':      'inserer date arrivee',
// tslint:disable-next-line: object-literal-key-quotes
},
  // tslint:disable-next-line: object-literal-key-quotes
  'lieux_arrive': {
  // tslint:disable-next-line: object-literal-key-quotes
'required':      'inserer lieu arrivee',
// tslint:disable-next-line: object-literal-key-quotes
'minlength': 'au moins 3 lettre'
// tslint:disable-next-line: object-literal-key-quotes
},
  // tslint:disable-next-line: object-literal-key-quotes
  'heure_arrive': {
  // tslint:disable-next-line: object-literal-key-quotes
'required':      'inserer heure arrive',
// tslint:disable-next-line: object-literal-key-quotes
},
  // tslint:disable-next-line: object-literal-key-quotes
  'distance_trajet': {
  // tslint:disable-next-line: object-literal-key-quotes
'required':      'inserer distance parcouru',
// tslint:disable-next-line: object-literal-key-quotes
},
  // tslint:disable-next-line: object-literal-key-quotes
  'duree_trajet': {
  // tslint:disable-next-line: object-literal-key-quotes
'required':      'inserer duree du trajet',
// tslint:disable-next-line: object-literal-key-quotes
},
  // tslint:disable-next-line: object-literal-key-quotes
  'vitesse_trajet': {
  // tslint:disable-next-line: object-literal-key-quotes
'required':      'inserer vitesse du trajet',
// tslint:disable-next-line: object-literal-key-quotes
},
};

  constructor(private fb: FormBuilder,private clientService: ClientService ,private confirmationService: ConfirmationService, private vehiculesService: VehiculesService , private specialisationService: SpecialisationService,
    private carnetentretienService: CarnetEntretienService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.carnetentretienService.getPremiersHistorique()
    .subscribe((data) => {this.historique = data, console.log(data), this.loading = false; } ,error => console.log(error));
    this.carnetentretienService.getAllHistorique()
    .subscribe((data) => {this.Allhistorique = data, console.log(data) } ,error => console.log(error));



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





//////////////////////////////////les select /////////////////////////////////
  selectvec_carburant: Vehicule;  selectedVehicule_carburant: Vehicule ;
  selectvec_depense: Vehicule;  selectedVehicule_depense: Vehicule ;
  selectvec_entretien: Vehicule;  selectedVehicule_entretien: Vehicule ;
  selectvec_trajet: Vehicule;  selectedVehicule_trajet: Vehicule ;
  selectvec_odometer: Vehicule;  selectedVehicule_odometer: Vehicule ;

  selected_depense : String ; selected_d;

  selectspec: String;
  selectAge: Specialisation;
  selectmodelx : DetailSpecialisation;
  setVehicule_carburant(){
    this.selectvec_carburant = this.selectedVehicule_carburant; console.log(this.selectvec_carburant);
    this.carnetentretienService.getHistoriqueByVehicule(this.selectvec_carburant.id)
    .subscribe((data) => {this.Allhistoriquebyvehicule = data, console.log(data), this.loading = false; } ,error => console.log(error));
  }
    setVehicule_entretien(){
      this.selectvec_entretien = this.selectedVehicule_entretien;console.log(this.selectvec_entretien);}
      setVehicule_depense(){
        this.selectvec_depense = this.selectedVehicule_depense;console.log(this.selectvec_depense);}
        setVehicule_trajet(){
          this.selectvec_trajet = this.selectedVehicule_trajet;console.log(this.selectvec_trajet);}
          setVehicule_odometer(){
            this.selectvec_odometer = this.selectedVehicule_odometer;console.log(this.selectvec_odometer);}
  setspec(){

    this.selectspec = this.specialisationss.toString() ;
    console.log(this.selectspec);

  }
  deleteclient() {
   // this.historiqueDialog = false ;
    this.confirmationService.confirm({
        message: 'Etes-vous sûr que vous voulez supprimer  ' +  '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

        }
    });
  }
  setspecialisation(){
    this.selectspec = this.specialisationss.toString() ;
    console.log(this.selectspec);
  }
  setModelValue(){
    this.selectmodelx = this.selectedModel;
    console.log(this.selectmodelx);

  }

  setDepense() {
    this.selected_depense = this.selected_d;
    console.log(this.selected_depense);

  }

  setSpecialisationValue(){

  }

  //////////////////////////////////////////////////////////////////////////



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
  date_entretien: ['' , [Validators.required]],
  centre_entretien: ['' , [Validators.required] ,[Validators.minLength(3)]],
  vehicule: ['' , [Validators.required]],
  prix_entretien: ['' , [Validators.required], [Validators.minLength(2)]],
  note_entretien: '',
  specialisations: ['' , [Validators.required]],
  odometer_entretien : ['' , [Validators.required]],

    });
    this.form_entretien.valueChanges
.subscribe(data => this.onValueChanged_entretien(data));

// tslint:disable-next-line: align
this.onValueChanged_entretien();
  }

  CreateForm_carburant() {
    this.form_carburant = this.fb.group({


      date_carburant: ['' , [Validators.required]],
      vehicule: ['' , [Validators.required]],
      station_carburant: ['', [Validators.required], [Validators.minLength(3)]],
    //  cin: ['', [Validators.required, Validators.pattern , Validators.minLength(8) , Validators.maxLength(8)] ]  ,
      quantite_carburant: ['', [Validators.required, Validators.pattern] ],
      depense_carburant: ['', [Validators.required], [Validators.pattern]],
      odometer_carburant: ['', [Validators.required], [Validators.pattern]],
      note_carburant: [''],


    });
    this.form_carburant.valueChanges
.subscribe(data => this.onValueChanged_carburant(data));

// tslint:disable-next-line: align
this.onValueChanged_carburant();
  }


  CreateForm_odometer() {
    this.form_odometer = this.fb.group({
          date_odometer: ['' , [Validators.required]],
          odomoeter_cal: ['' , [Validators.required]],
          note_odometer: [''],

    });
    this.form_odometer.valueChanges
.subscribe(data => this.onValueChanged_odometer(data));

// tslint:disable-next-line: align
this.onValueChanged_odometer();
  }



  CreateForm_depense() {
    this.form_depense = this.fb.group({


      date_depense: ['' , [Validators.required]],
      prix_depense: ['' , [Validators.required]],
      note_depense: [''],
      odometer_depense: ['' , [Validators.required]],
      depense: ['' , [Validators.required]],

    });
    this.form_depense.valueChanges
.subscribe(data => this.onValueChanged_depense(data));

// tslint:disable-next-line: align
this.onValueChanged_depense();
  }
  CreateForm_trajet() {
    this.form_trajet = this.fb.group({
      heure_depart: ['' , [Validators.required]],
      date_depart : ['' , [Validators.required]],
      lieux_depart : ['' , [Validators.required], [Validators.minLength(3)]],

      heure_arrive: ['' , [Validators.required]],
      date_arrive : ['' , [Validators.required]],
      lieux_arrive: ['' , [Validators.required], [Validators.minLength(3)]],
      taxe_trajet: ['' , [Validators.required]],
      note_trajet: [''],
      distance_trajet: ['' , [Validators.required]],
      duree_trajet: ['' , [Validators.required]],
      vitesse_trajet: ['' , [Validators.required]],

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
    this.form.value.vehicule = this.selectvec_carburant;
    this.form.value.specialisations = this.selectspec ;

     console.log(this.form.value);


   }

   onsubmit_entretien(){
    this.form_entretien.value.specialisations = this.selectspec;
    this.form_entretien.value.vehicule = this.selectvec_entretien;
    this.carnet_entretien = this.form_entretien.value ;
    console.log(this.form_entretien.value);
     this.carnetentretienService.ajouter_entretien(this.carnet_entretien).subscribe(
       data => {
         console.log(data);} );
         this.form_entretien.reset();
         this.entretienDialog = false ;
         this.messageService.add({severity:'info', summary: 'Info', detail: 'entretien ajouté '});

   }

   onsubmit_carburant():void{
    this.form_carburant.value.vehicule = this.selectvec_carburant;
   this.carnet_carbutant = this.form_carburant.value ;
   console.log(this.form_carburant.value);
    this.carnetentretienService.ajouter_carburant(this.carnet_carbutant).subscribe(
      data => {
        console.log(data);} );
      //  this.form_carburant.reset();
        this.carburantFormDirective.reset();
        this.carburantDialog = false;
        this.messageService.add({severity:'info', summary: 'Info', detail: 'carburant ajouté '});

  }
  onsubmit_depense(){
    this.form_depense.value.depense =this.selected_depense;
    this.form_depense.value.vehicule = this.selectvec_depense;
    this.carnet_depense = this.form_depense.value ;
    console.log(this.form_depense.value);
     this.carnetentretienService.ajouter_depense(this.carnet_depense).subscribe(
       data => {
         console.log(data);} );
         this.form_depense.reset();
         this.depenseDialog = false ;
         this.messageService.add({severity:'info', summary: 'Info', detail: 'depense ajouté '});

  }
  onsubmit_trajet(){

    this.form_trajet.value.vehicule = this.selectvec_trajet;
    this.carnet_trajet = this.form_trajet.value ;
    console.log(this.form_trajet.value);
     this.carnetentretienService.ajouter_trajet(this.carnet_trajet).subscribe(
       data => {
         console.log(data);} );
         this.form_trajet.reset();
         this.trajetDialog = false ;
         this.messageService.add({severity:'info', summary: 'Info', detail: 'trajet ajouté '});


  }
  onsubmit_odometer(){

    this.form_odometer.value.vehicule = this.selectvec_odometer;
    this.carnet_odometer = this.form_odometer.value ;
    console.log(this.form_odometer.value);
     this.carnetentretienService.ajouter_odometer(this.carnet_odometer).subscribe(
       data => {
         console.log(data);} );
         this.form_odometer.reset();
         this.odometerDialog = false ;
         this.messageService.add({severity:'info', summary: 'Info', detail: 'odometer ajouté '});

  }


///////////////////////////////////////////////////////////////////////////






/////////////////////////////hide & affiche dialogue ////////////////////////////////////
showhistoriqueDialog() {
  this.historiqueDialog = true;
}

editentretiendialog() {
  this.historiqueDialog = false;
  this.editDialog = true ;
}
hideeditDialog(){
  this.editDialog = false ;
  this.historiqueDialog = true;

}

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

////////////////////////////////////interface_statistique///////
condition_total = true;
condition_carburant=true;
condition_entretien=true;
condition_depense=true;
condition_trajet=true;
condition_odometer=true;

work_total(){this.condition_total=false;}
workk_total(){this.condition_total=true;}

work_carburant(){this.condition_carburant=false;}
workk_carburant(){this.condition_carburant=true;}

work_entretien(){this.condition_entretien=false;}
workk_entretien(){this.condition_entretien=true;}

work_depense(){this.condition_depense=false;}
workk_depense(){this.condition_depense=true;}

work_trajet(){this.condition_trajet=false;}
workk_trajet(){this.condition_trajet=true;}

work_odometer(){this.condition_odometer=false;}
workk_odometer(){this.condition_odometer=true;}



////////////////////////////////////////////////////////////////////////////

}
/////////////////////////////////////////////////////////////////////////////Historique/////////////////////////

