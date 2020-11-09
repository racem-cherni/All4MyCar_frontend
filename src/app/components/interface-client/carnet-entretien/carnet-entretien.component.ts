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
import { ConfirmationService, MessageService } from 'primeng/api';
import { Historique } from 'src/app/entities/historique';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-carnet-entretien',
  templateUrl: './carnet-entretien.component.html',
  styleUrls: ['./carnet-entretien.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CarnetEntretienComponent implements OnInit {
  Allhistoriquebyvehicule: Historique[] = [];
  Allhistorique: Historique[] = [];
  historique: Historique[] = [];
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
  carnet_carbutant: CarburantCarnet;
  carnet_depense: DepenseCarnet;
  carnet_entretien: EntretienCarnet;
  carnet_trajet: TrajetCarnet;
  carnet_odometer: OdometerCarnet;

  date_depensee: Date;


  date_carburantt: Date;

  sysdate: Date = new Date();


  Vehicules: Vehicule[] = [];
  clientt: Client;
  specialisations: Specialisation[] = [];
  specialisationss: String[];
  detailsspecialisation: DetailSpecialisation[] = [];
  selectedModel: DetailSpecialisation;
  detailss: DetailSpecialisation[] = [];
  depences: string[] = ['Fine', 'Insurance', 'MOT', 'Parking', 'Tax', 'Toll'];
  form: FormGroup;
  form_entretien: FormGroup;
  form_carburant: FormGroup;
  form_trajet: FormGroup;
  form_depense: FormGroup;
  form_odometer: FormGroup;
  @ViewChild('cform',) carburantFormDirective;
  @ViewChild('eform') entretienFormDirective;
  @ViewChild('tform') trajetFormDirective;
  @ViewChild('oform') odometerFormDirective;
  @ViewChild('dform') depenseFormDirective;

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
      'required': 'la date est nécessaire.',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'vehicule': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'choisir une vehicule',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'odometer_carburant': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer le kilometrage',
      // tslint:disable-next-line: object-literal-key-quotes
      'minlength': 'au moins 3 lettre'
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'quantite_carburant': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'cin is required.',
      // tslint:disable-next-line: object-literal-key-quotes
      'pattern': 'cin must contain only numbers.',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'station_carburant': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer la station',
      // tslint:disable-next-line: object-literal-key-quotes
      'minlength': 'cin must contain  3 numbers',
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'depense_carburant': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer le prix totale',
      // tslint:disable-next-line: object-literal-key-quotes
      'minlength': 'au moins 3 lettre'
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'date_entretien': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'la date est nécessaire.',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'centre_entretien': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer le centre de service.',
      // tslint:disable-next-line: object-literal-key-quotes
      'minlength': 'au moins 3 lettre'
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'odometer_entretien': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer le kilometrage',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'specialisations': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer entretien',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'prix_entretien': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer le prix totale',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'date_depense': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer la date',
      // tslint:disable-next-line: object-literal-key-quotes'

    },
    // tslint:disable-next-line: object-literal-key-quotes
    'odometer_depense': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer kilometrage',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'depense': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'choisir depense',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'prix_depense': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer prix',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'date_odometer': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer date',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'odomoeter_cal': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer kilometrage',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'date_depart': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer date depart',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'lieux_depart': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer lieu depart',
      // tslint:disable-next-line: object-literal-key-quotes
      'minlength': 'au moins 3 lettre'
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'heure_depart': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer heure depart',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'date_arrive': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer date arrivee',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'lieux_arrive': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer lieu arrivee',
      // tslint:disable-next-line: object-literal-key-quotes
      'minlength': 'au moins 3 lettre'
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'heure_arrive': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer heure arrive',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'distance_trajet': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer distance parcouru',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'duree_trajet': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer duree du trajet',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
    'vitesse_trajet': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required': 'inserer vitesse du trajet',
      // tslint:disable-next-line: object-literal-key-quotes
    },
  };

  constructor(private fb: FormBuilder, private clientService: ClientService, private confirmationService: ConfirmationService, private vehiculesService: VehiculesService, private specialisationService: SpecialisationService,
    private carnetentretienService: CarnetEntretienService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.carnetentretienService.getPremiersHistorique()
      .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
    this.carnetentretienService.getAllHistorique()
      .subscribe((data) => { this.Allhistorique = data, console.log(data) }, error => console.log(error));



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
      .subscribe((data) => {
        this.clientt = data, console.log(typeof (data.date_inscrip)),
          this.vehiculesService.getVehiculess().subscribe((data) => {
            this.Vehicules = data, console.log(data)
          },

            error => console.log(error));
      }, error => console.log(error));
    this.specialisationService.getspecialisations()
      .subscribe((data) => { this.specialisations = data, console.log(data); });
  }





  //////////////////////////////////les select /////////////////////////////////
  selectvec_carburant: Vehicule; selectedVehicule_carburant: Vehicule;
  selectvec_depense: Vehicule; selectedVehicule_depense: Vehicule;
  selectvec_entretien: Vehicule; selectedVehicule_entretien: Vehicule;
  selectvec_trajet: Vehicule; selectedVehicule_trajet: Vehicule;
  selectvec_odometer: Vehicule; selectedVehicule_odometer: Vehicule;

  selected_depense: String; selected_d;

  selectspec: String;
  selectAge: Specialisation;
  selectmodelx: DetailSpecialisation;
  setVehicule_carburant() {
    this.selectvec_carburant = this.selectedVehicule_carburant; console.log(this.selectvec_carburant);
    this.carnetentretienService.getHistoriqueByVehicule(this.selectvec_carburant.id)
      .subscribe((data) => { this.Allhistoriquebyvehicule = data, console.log(data), this.loading = false; }, error => console.log(error));
  }
  setVehicule_entretien() {
    this.selectvec_entretien = this.selectedVehicule_entretien; console.log(this.selectvec_entretien);
  }
  setVehicule_depense() {
    this.selectvec_depense = this.selectedVehicule_depense; console.log(this.selectvec_depense);
  }
  setVehicule_trajet() {
    this.selectvec_trajet = this.selectedVehicule_trajet; console.log(this.selectvec_trajet);
  }
  setVehicule_odometer() {
    this.selectvec_odometer = this.selectedVehicule_odometer; console.log(this.selectvec_odometer);
  }
  setspec() {

    this.selectspec = this.specialisationss.toString();
    console.log(this.selectspec);

  }
  deleteclient() {

 }
 deletecarburanthistorique(his : Historique){
this.carnetentretienService.removehistorique(his.id).subscribe(data =>{console.log(data); this.carnetentretienService.getHistoriqueByVehicule(this.selectvec_carburant.id)
  .subscribe((data) => { this.Allhistoriquebyvehicule = data, console.log(data), this.loading = false;}, error => console.log(error));
  this.messageService.add({ severity: 'error', summary: 'Suppression', detail: 'carburant supprimé ' });
  this.carnetentretienService.getPremiersHistorique()
  .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
});
this.carnetentretienService.removecarburant(his.carburant.id).subscribe(data => console.log(data));

 }
 deleteentretienhistorique(his : Historique){
  this.carnetentretienService.removehistorique(his.id).subscribe(data =>{console.log(data); this.carnetentretienService.getHistoriqueByVehicule(this.selectvec_carburant.id)
    .subscribe((data) => { this.Allhistoriquebyvehicule = data, console.log(data), this.loading = false; }, error => console.log(error));
    this.messageService.add({ severity: 'error', summary: 'Suppression', detail: 'entretien supprimé ' });
    this.carnetentretienService.getPremiersHistorique()
    .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
  });
  this.carnetentretienService.removeentretien(his.entretien.id).subscribe(data => console.log(data));

 }
 deletetrajethistorique(his : Historique){
  this.carnetentretienService.removehistorique(his.id).subscribe(data =>{console.log(data); this.carnetentretienService.getHistoriqueByVehicule(this.selectvec_carburant.id)
    .subscribe((data) => { this.Allhistoriquebyvehicule = data, console.log(data), this.loading = false;}, error => console.log(error));
    this.messageService.add({ severity: 'error', summary: 'Suppression', detail: 'trajet supprimé ' });
    this.carnetentretienService.getPremiersHistorique()
    .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
  });
  this.carnetentretienService.removetrajet(his.trajet.id).subscribe(data => console.log(data));

 }

 deleteadometerhistorique(his : Historique){
  this.carnetentretienService.removehistorique(his.id).subscribe(data =>{console.log(data); this.carnetentretienService.getHistoriqueByVehicule(this.selectvec_carburant.id)
    .subscribe((data) => { this.Allhistoriquebyvehicule = data, console.log(data), this.loading = false;}, error => console.log(error));
    this.messageService.add({ severity: 'error', summary: 'Suppression', detail: 'odemeter supprimé ' });
    this.carnetentretienService.getPremiersHistorique()
    .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
  });
  this.carnetentretienService.removeodometer(his.odometer.id).subscribe(data => console.log(data));

 }

 deletedepensehistorique(his : Historique){
  this.carnetentretienService.removehistorique(his.id).subscribe(data =>{console.log(data); this.carnetentretienService.getHistoriqueByVehicule(this.selectvec_carburant.id)
    .subscribe((data) => { this.Allhistoriquebyvehicule = data, console.log(data), this.loading = false;}, error => console.log(error));
    this.messageService.add({ severity: 'error', summary: 'Suppression', detail: 'depense supprimé ' });
    this.carnetentretienService.getPremiersHistorique()
    .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
  });
  this.carnetentretienService.removedepense(his.depense.id).subscribe(data => console.log(data));

 }

  setspecialisation() {
    this.selectspec = this.specialisationss.toString();
    console.log(this.selectspec);
  }
  setModelValue() {
    this.selectmodelx = this.selectedModel;
    console.log(this.selectmodelx);

  }

  setDepense() {
    this.selected_depense = this.selected_d;
    console.log(this.selected_depense);

  }

  setSpecialisationValue() {

  }

  //////////////////////////////////////////////////////////////////////////



  ////////////////////////////////////// create form /////////////////////////////////////////
  CreateVehiculeForm() {
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
      date_entretien: ['', [Validators.required]],
      centre_entretien: ['', [Validators.required], [Validators.minLength(3)]],
      vehicule: ['', [Validators.required]],
      prix_entretien: ['', [Validators.required], [Validators.minLength(2)]],
      note_entretien: '',
      specialisations: ['', [Validators.required]],
      odometer_entretien: ['', [Validators.required]],

    });
    this.form_entretien.valueChanges
      .subscribe(data => this.onValueChanged_entretien(data));

    // tslint:disable-next-line: align
    this.onValueChanged_entretien();
  }

  CreateForm_carburant() {
    this.form_carburant = this.fb.group({


      date_carburant: ['', [Validators.required]],
      vehicule: ['', [Validators.required]],
      station_carburant: ['', [Validators.required], [Validators.minLength(3)]],
      //  cin: ['', [Validators.required, Validators.pattern , Validators.minLength(8) , Validators.maxLength(8)] ]  ,
      quantite_carburant: ['', [Validators.required, Validators.pattern]],
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
      date_odometer: ['', [Validators.required]],
      odomoeter_cal: ['', [Validators.required]],
      note_odometer: [''],

    });
    this.form_odometer.valueChanges
      .subscribe(data => this.onValueChanged_odometer(data));

    // tslint:disable-next-line: align
    this.onValueChanged_odometer();
  }



  CreateForm_depense() {
    this.form_depense = this.fb.group({


      date_depense: ['', [Validators.required]],
      prix_depense: ['', [Validators.required]],
      note_depense: [''],
      odometer_depense: ['', [Validators.required]],
      depense: ['', [Validators.required]],

    });
    this.form_depense.valueChanges
      .subscribe(data => this.onValueChanged_depense(data));

    // tslint:disable-next-line: align
    this.onValueChanged_depense();
  }
  CreateForm_trajet() {
    this.form_trajet = this.fb.group({
      heure_depart: ['', [Validators.required]],
      date_depart: ['', [Validators.required]],
      lieux_depart: ['', [Validators.required], [Validators.minLength(3)]],

      heure_arrive: ['', [Validators.required]],
      date_arrive: ['', [Validators.required]],
      lieux_arrive: ['', [Validators.required], [Validators.minLength(3)]],
      taxe_trajet: ['', [Validators.required]],
      note_trajet: [''],
      distance_trajet: ['', [Validators.required]],
      duree_trajet: ['', [Validators.required]],
      vitesse_trajet: ['', [Validators.required]],

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
  onsubmit() {
    this.form.value.vehicule = this.selectvec_carburant;
    this.form.value.specialisations = this.selectspec;

    console.log(this.form.value);


  }

  onsubmit_entretien() {
    this.form_entretien.value.specialisations = this.selectspec;
    this.form_entretien.value.vehicule = this.selectvec_entretien;
    this.carnet_entretien = this.form_entretien.value;
    console.log(this.form_entretien.value);
    this.carnetentretienService.ajouter_entretien(this.carnet_entretien).subscribe(
      data => {
        console.log(data);this.carnetentretienService.getPremiersHistorique()
        .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
        this.carnetentretienService.getAllHistorique()
        .subscribe((data) => { this.Allhistorique = data, console.log(data) }, error => console.log(error));
        this.carnetentretienService.getPremiersHistorique()
      .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
      });
    this.form_entretien.reset();
    this.entretienDialog = false;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'entretien ajouté ' });

  }

  onsubmit_carburant(): void {
    this.form_carburant.value.vehicule = this.selectvec_carburant;
    this.carnet_carbutant = this.form_carburant.value;
    console.log(this.form_carburant.value);
    this.carnetentretienService.ajouter_carburant(this.carnet_carbutant).subscribe(
      data => {
        console.log(data);this.carnetentretienService.getPremiersHistorique()
        .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
        this.carnetentretienService.getAllHistorique()
        .subscribe((data) => { this.Allhistorique = data, console.log(data) }, error => console.log(error));
        this.carnetentretienService.getPremiersHistorique()
      .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
      });
    //  this.form_carburant.reset();
    this.carburantFormDirective.reset();
    this.carburantDialog = false;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'carburant ajouté ' });

  }
  onsubmit_depense() {
    this.form_depense.value.depense = this.selected_depense;
    this.form_depense.value.vehicule = this.selectvec_depense;
    this.carnet_depense = this.form_depense.value;
    console.log(this.form_depense.value);
    this.carnetentretienService.ajouter_depense(this.carnet_depense).subscribe(
      data => {
        console.log(data);this.carnetentretienService.getPremiersHistorique()
        .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
        this.carnetentretienService.getAllHistorique()
        .subscribe((data) => { this.Allhistorique = data, console.log(data) }, error => console.log(error));
        this.carnetentretienService.getPremiersHistorique()
      .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
      });
    this.form_depense.reset();
    this.depenseDialog = false;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'depense ajouté ' });

  }
  onsubmit_trajet() {

    this.form_trajet.value.vehicule = this.selectvec_trajet;
    this.carnet_trajet = this.form_trajet.value;
    console.log(this.form_trajet.value);
    this.carnetentretienService.ajouter_trajet(this.carnet_trajet).subscribe(
      data => {
        console.log(data);this.carnetentretienService.getPremiersHistorique()
        .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
        this.carnetentretienService.getAllHistorique()
        .subscribe((data) => { this.Allhistorique = data, console.log(data) }, error => console.log(error));
        this.carnetentretienService.getPremiersHistorique()
      .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
      });
    this.form_trajet.reset();
    this.trajetDialog = false;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'trajet ajouté ' });


  }
  onsubmit_odometer() {

    this.form_odometer.value.vehicule = this.selectvec_odometer;
    this.carnet_odometer = this.form_odometer.value;
    console.log(this.form_odometer.value);
    this.carnetentretienService.ajouter_odometer(this.carnet_odometer).subscribe(
      data => {
        console.log(data);this.carnetentretienService.getPremiersHistorique()
        .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
        this.carnetentretienService.getAllHistorique()
        .subscribe((data) => { this.Allhistorique = data, console.log(data) }, error => console.log(error));
        this.carnetentretienService.getPremiersHistorique()
      .subscribe((data) => { this.historique = data, console.log(data), this.loading = false; }, error => console.log(error));
      });
    this.form_odometer.reset();
    this.odometerDialog = false;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'odometer ajouté ' });

  }


  ///////////////////////////////////////////////////////////////////////////






  /////////////////////////////hide & affiche dialogue ////////////////////////////////////
  showhistoriqueDialog() {
    this.historiqueDialog = true;
  }

  editentretiendialog() {
    this.historiqueDialog = false;
    this.editDialog = true;
  }
  hideeditDialog() {
    this.editDialog = false;
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
  condition_carburant = true;
  condition_entretien = true;
  condition_depense = true;
  condition_trajet = true;
  condition_odometer = true;
  second_carburant = true;

  second_depense = true;
  third_depense = true;

  work_total() { this.condition_total = false; }
  workk_total() { this.condition_total = true; }

  work_carburant() { this.condition_carburant = false; }
  workk_carburant() { this.condition_carburant = true; }

  work_entretien() { this.condition_entretien = false; }
  workk_entretien() { this.condition_entretien = true; }

  work_depense() { this.condition_depense = false; }
  workk_depense() { this.condition_depense = true; }

  work_trajet() { this.condition_trajet = false; }
  workk_trajet() { this.condition_trajet = true; }

  work_odometer() { this.condition_odometer = false; }
  workk_odometer() { this.condition_odometer = true; }

  secondt_carburant() { this.second_carburant = false; }
  secondf_carburant() { this.second_carburant = true; }

  secondt_depense() { this.second_depense = false; }
  secondf_depense() { this.second_depense = true; }

  thirdt_depense() { this.third_depense = false; }
  thirdf_depense() { this.third_depense = true; }
  //////////////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////Statistique ////////////////////////////////////////////////
  selectedVehicule_stats: Vehicule;
  selectedVehiculeStats: Vehicule;

  selectedPeriode_stats: string[] = ["ALLTIME", "THIS_MONTH", "LAST_MONTH", "THIS_YEAR"];
  selectedPeriode: string;
  selectedPeriode_statistique: string;
  periode: String = "ALLTIME";

  ////////////////////// donnéee carburant
  nbr_carburant: number = 0; nbr_carburantMois: number; nbr_distanceParCarburant: number = 0; qte_carburant: number = 0;
  qte_moy_carburant: number = 0; depense_carburant: number = 0; depense_carburantMois: number = 0; depense_moy_carburant: number = 0;
  total_Ac_carburant: number=0;
  qte_moy_carburantS:String;nbr_distanceParCarburantS:String;depense_moy_carburantS:String;depense_carburantMoisS:String;
  nbr_carburantMoisS:String;
  carburant_forstats: CarburantCarnet[];carburant_fortotal: CarburantCarnet[];
  /////////////////////
  ////////////////////donnée entretien
  nbr_entretien: number = 0; nbr_entretienMois: number = 0; depense_entretien: number = 0;
  depense_entretienMois: number = 0; distance_moy_entretien: number = 0;total_Ac_entretien: number=0;

  distance_moy_entretienS: String;nbr_entretienMoisS:String;depense_entretienMoisS:String;

  entretien_forstats: EntretienCarnet[];entretien_fortotal: EntretienCarnet[];
  ////////////////////
  ////////////////////donnée odometer
  kilometrage:number=0;kilometrage_jour:number=0;kilometrage_semaine:number=0;kilometrage_mois:number=0;
  kilometrage_annee:number=0;total_Ac_odometer: number=0;

  kilometrage_jourS:String;kilometrage_semaineS:String;kilometrage_moisS:String;
  kilometrage_anneeS:String;kilometrageS:String;

  odometer_forstats: OdometerCarnet[];odometer_fortotal: OdometerCarnet[];
  ////////////////////
  ////////////////////donnée depense
  depense_total: number = 0; depense_fine: number = 0; depense_insurance: number = 0; depense_mot: number = 0;
  depense_parking: number = 0; depense_Tax: number = 0; depense_troll: number = 0;total_Ac_depense: number=0;

  nbr_depense_total: number = 0; nbr_depense_fine: number = 0; nbr_depense_insurance: number = 0; nbr_depense_mot: number = 0;
  nbr_depense_parking: number = 0; nbr_depense_Tax: number = 0; nbr_depense_troll: number = 0;

  depense_forstats: DepenseCarnet[];depense_fortotal: DepenseCarnet[];
  ////////////////////
  ////////////////////donnée trajet
  nbr_trajet : number = 0; kilometre_trajet: number = 0; taxe_trajet: number = 0;total_Ac_trajet: number=0;
  moy_vitesse_trajet = 0;temp_trajet: number = 0;moy_vitesse_trajetS:String;

  trajet_forstats: TrajetCarnet[];trajet_fortotal: TrajetCarnet[];
  ////////////////////
  ////////////////////donnée total
  total_action : number=0;pourcentage_carburant:number;pourcentage_odometer:number;pourcentage_trajet:number;
  pourcentage_entretien:number;pourcentage_depense:number;total_Ac_total: number=0;

  pourcentage_carburantS:String="";pourcentage_odometerS:String="";pourcentage_trajetS:String="";
  pourcentage_entretienS:String="";pourcentage_depenseS:String="";
  ////////////////////

  SetPeriode() {
    this.periode = this.selectedPeriode_statistique;
    this.setVehicule_statistique();
  }

  setVehicule_statistique() {
    this.selectedVehiculeStats = this.selectedVehicule_stats;
    console.log(this.periode);
    console.log(this.selectedVehiculeStats.id);
    ///////////////////////////statistique_carburant/////////////////
    this.nbr_carburant = 0;
    this.qte_carburant = 0;
    this.nbr_distanceParCarburant = 0;
    this.qte_moy_carburant = 0;
    this.depense_carburant = 0;
    this.depense_moy_carburant = 0;
    this.nbr_carburantMois=0;
    this.carnetentretienService.getCarburantParPeriode(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {
        this.carburant_forstats = data, console.log(data);
        if (this.carburant_forstats.length !== 0) {
          this.nbr_carburant = this.carburant_forstats.length;
          for (let i = 0; i < this.carburant_forstats.length; i++) {

            if (this.carburant_forstats.length >= 2) {
              if (i < this.carburant_forstats.length - 1)
                this.nbr_distanceParCarburant = this.nbr_distanceParCarburant + (this.carburant_forstats[i + 1].odometer_carburant
                  - this.carburant_forstats[i].odometer_carburant);
            }
            else this.nbr_distanceParCarburant = 0;

            this.qte_carburant += this.carburant_forstats[i].quantite_carburant;
            this.depense_carburant += this.carburant_forstats[i].depense_carburant;
          }
          this.qte_moy_carburant = this.qte_carburant / this.carburant_forstats.length;
          this.nbr_distanceParCarburant = this.nbr_distanceParCarburant / this.carburant_forstats.length;
          this.depense_moy_carburant = this.depense_carburant / this.carburant_forstats.length;

          this.qte_moy_carburantS=this.qte_moy_carburant.toFixed(2);
          this.nbr_distanceParCarburantS=this.nbr_distanceParCarburant.toFixed(2);
          this.depense_moy_carburantS=this.depense_moy_carburant.toFixed(2);

        }
      });

      this.carnetentretienService.getCarburantParPeriode(this.selectedVehiculeStats.id,"ALLTIME")
      .subscribe((data) => {
        this.carburant_fortotal = data, console.log(data);
        this.total_Ac_carburant = this.carburant_fortotal.length;

      });

      this.carnetentretienService.getDepense_carburantMois(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {this.depense_carburantMois= data, console.log(data);
      this.depense_carburantMoisS=this.depense_carburantMois.toFixed(2)});

      this.carnetentretienService.getRemplis_carburantMois(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {this.nbr_carburantMois= data, console.log(data);
      this.nbr_carburantMoisS=this.nbr_carburantMois.toFixed(2)});

      this.carnetentretienService.getNbr_entretienMois(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {this.nbr_entretienMois= data, console.log(data);
      this.nbr_entretienMoisS=this.nbr_entretienMois.toFixed(2)});

      this.carnetentretienService.getDepense_entretienMois(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {this.depense_entretienMois= data, console.log(data);
      this.depense_entretienMoisS=this.depense_entretienMois.toFixed(2)});

      this.carnetentretienService.getKilometrage_jour(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {this.kilometrage_jour= data, console.log(data);
      this.kilometrage_jourS=this.kilometrage_jour.toFixed(2)});

      this.carnetentretienService.getKilometrage_mois(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {this.kilometrage_mois= data, console.log(data);
      this.kilometrage_moisS=this.kilometrage_mois.toFixed(2)});

      this.carnetentretienService.getKilometrage_semaine(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {this.kilometrage_semaine= data, console.log(data);
      this.kilometrage_semaineS=this.kilometrage_semaine.toFixed(2)});

      this.carnetentretienService.getKilometrage_annee(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {this.kilometrage_annee= data, console.log(data);
      this.kilometrage_anneeS=this.kilometrage_annee.toFixed(2)});


    ///////////////////////////statistique_entretien/////////////////////
    this.nbr_entretien = 0;
    this.nbr_entretienMois = 0;
    this.depense_entretien = 0;
    this.depense_entretienMois = 0;
    this.distance_moy_entretien = 0;
    this.distance_moy_entretienS = "0";

    this.carnetentretienService.getEntretienParPeriode(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {
        this.entretien_forstats = data, console.log(data);
        if (this.entretien_forstats.length !== 0) {
          this.nbr_entretien = this.entretien_forstats.length;
          for (let i = 0; i < this.entretien_forstats.length; i++) {

            if (this.entretien_forstats.length >= 2) {
              if (i < this.entretien_forstats.length - 1)
                this.distance_moy_entretien = this.distance_moy_entretien + (this.entretien_forstats[i + 1].odometer_entretien
                  - this.entretien_forstats[i].odometer_entretien);
            }
            else this.distance_moy_entretien = 0;

            this.depense_entretien += this.entretien_forstats[i].prix_entretien;
          }
          this.distance_moy_entretien = this.distance_moy_entretien / this.entretien_forstats.length;
          this.distance_moy_entretienS = this.distance_moy_entretien.toFixed(2);
        }
      });
      this.carnetentretienService.getEntretienParPeriode(this.selectedVehiculeStats.id, "ALLTIME")
      .subscribe((data) => {
        this.entretien_fortotal = data, console.log(data);
          this.total_Ac_entretien = this.entretien_fortotal.length;
      });

    ///////////////////////////statistique_depense////////////////////////
    this.depense_total = 0; this.depense_fine = 0; this.depense_insurance = 0; this.depense_mot = 0;
    this.depense_parking = 0; this.depense_Tax = 0; this.depense_troll = 0;

    this.nbr_depense_total = 0; this.nbr_depense_fine = 0; this.nbr_depense_insurance = 0; this.nbr_depense_mot = 0;
    this.nbr_depense_parking = 0; this.nbr_depense_Tax = 0; this.nbr_depense_troll = 0;

    this.carnetentretienService.getDepenseParPeriode(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {
        this.depense_forstats = data, console.log(data);

        if (this.depense_forstats.length !== 0) {

          this.nbr_depense_total = this.depense_forstats.length;

          for (let i = 0; i < this.depense_forstats.length; i++) {

            this.depense_total = this.depense_total+this.depense_forstats[i].prix_depense;;

            if (this.depense_forstats[i].depense === "Fine") {
              this.nbr_depense_fine = this.nbr_depense_fine + 1;
              this.depense_fine = this.depense_fine + this.depense_forstats[i].prix_depense;
            }

            if (this.depense_forstats[i].depense === "Insurance") {
              this.nbr_depense_insurance = this.nbr_depense_insurance + 1;
              this.depense_insurance = this.depense_insurance + this.depense_forstats[i].prix_depense;
            }

            if (this.depense_forstats[i].depense === "MOT") {
              this.nbr_depense_mot = this.nbr_depense_mot + 1;
              this.depense_mot = this.depense_mot + this.depense_forstats[i].prix_depense;
            }

            if (this.depense_forstats[i].depense === "Parking") {
              this.nbr_depense_parking = this.nbr_depense_parking + 1;
              this.depense_parking = this.depense_parking + this.depense_forstats[i].prix_depense;
            }

            if (this.depense_forstats[i].depense === "Toll") {
              this.nbr_depense_troll = this.nbr_depense_troll + 1;
              this.depense_troll = this.depense_troll + this.depense_forstats[i].prix_depense;
            }


          }

        }
      });

      this.carnetentretienService.getDepenseParPeriode(this.selectedVehiculeStats.id, "ALLTIME")
      .subscribe((data) => {
        this.depense_fortotal = data, console.log(data);
          this.total_Ac_depense = this.depense_fortotal.length;
      });
    ///////////////////////////statistique_trajet////////////////////////


      this.nbr_trajet=0; this.kilometre_trajet = 0; this.taxe_trajet=0;
      this.moy_vitesse_trajet = 0;this.temp_trajet= 0;

      this.carnetentretienService.getTrajetParPeriode(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {
        this.trajet_forstats = data, console.log(data);
        if (this.trajet_forstats.length !== 0) {

          this.nbr_trajet= this.trajet_forstats.length;

          for (let i = 0; i < this.trajet_forstats.length; i++) {

           this.kilometre_trajet= this.kilometre_trajet+this.trajet_forstats[i].distance_trajet;

           this.taxe_trajet=this.taxe_trajet+this.trajet_forstats[i].taxe_trajet;

           this.moy_vitesse_trajet=this.moy_vitesse_trajet+this.trajet_forstats[i].vitesse_trajet;

           this.temp_trajet=this.temp_trajet+this.trajet_forstats[i].duree_trajet;
          }
          this.moy_vitesse_trajet=this.moy_vitesse_trajet/this.trajet_forstats.length;
          this.moy_vitesse_trajetS=this.moy_vitesse_trajet.toFixed(2);
        }

      });

      this.carnetentretienService.getTrajetParPeriode(this.selectedVehiculeStats.id,"ALLTIME")
      .subscribe((data) => {
        this.trajet_fortotal = data, console.log(data);
          this.total_Ac_trajet= this.trajet_fortotal.length;
      });
    ///////////////////////////statistique_odometer/////////////////
    ///////////////////////////statistique_odometer/////////////////
      this.kilometrage=0;this.kilometrage_jour=0;this.kilometrage_semaine=0;
      this.kilometrage_mois=0;this.kilometrage_annee=0;

      this.carnetentretienService.getOdometerParPeriode(this.selectedVehiculeStats.id, this.periode)
      .subscribe((data) => {
        this.odometer_forstats = data, console.log(data);
        this.kilometrage =this.odometer_forstats[this.odometer_forstats.length-1].odomoeter_cal;
        this.kilometrageS =  this.kilometrage.toFixed(2);
            });

     this.carnetentretienService.getOdometerParPeriode(this.selectedVehiculeStats.id, "ALLTIME")
            .subscribe((data) => {
              this.odometer_fortotal = data, console.log(data);
              this.total_Ac_odometer= this.odometer_fortotal.length;

              this.total_Ac_total=this.total_Ac_trajet+this.total_Ac_odometer+this.total_Ac_depense+
              this.total_Ac_entretien+this.total_Ac_carburant;
                  });

  //////////////////////////////total



  this.pourcentage_carburant=(this.total_Ac_carburant/this.total_Ac_total)*100;
  this.pourcentage_trajet=(this.total_Ac_trajet/this.total_Ac_total)*100;
  this.pourcentage_odometer=(this.total_Ac_odometer/this.total_Ac_total)*100;
  this.pourcentage_depense=(this.total_Ac_depense/this.total_Ac_total)*100;
  this.pourcentage_entretien=(this.total_Ac_entretien/this.total_Ac_total)*100;

  this.pourcentage_carburantS=this.pourcentage_carburant.toFixed(2);
  this.pourcentage_trajetS=this.pourcentage_trajet.toFixed(2);
  this.pourcentage_odometerS=this.pourcentage_odometer.toFixed(2);
  this.pourcentage_depenseS=this.pourcentage_depense.toFixed(2);
  this.pourcentage_entretienS=this.pourcentage_entretien.toFixed(2);

  }




  /////////////////////////////////////////////////////////////////////////////Historique/////////////////////////
}
