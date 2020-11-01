import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Adressecities } from 'src/app/entities/adressecities';
import { Adressepays } from 'src/app/entities/adressepays';
import { Adressevilles } from 'src/app/entities/adressevilles';
import { Client } from 'src/app/entities/client';
import { DetailSpecialisation } from 'src/app/entities/detail-specialisation';
import { Specialisation } from 'src/app/entities/specialisation';
import { Vehicule } from 'src/app/entities/vehicule';
import { AdresseService } from 'src/app/_services/adresse.service';
import { ClientService } from 'src/app/_services/client.service';
import { SpecialisationService } from 'src/app/_services/specialisation.service';
import { UserService } from 'src/app/_services/user.service';
import { VehiculesService } from 'src/app/_services/vehicules.service';
import { CarnetEntretienComponent } from '../carnet-entretien/carnet-entretien.component';

@Component({
  selector: 'app-homeclient',
  templateUrl: './homeclient.component.html',
  styleUrls: ['./ok.scss']
})
export class HomeclientComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['tunis,centre ville', 'tunis', 'aryena','bizerte', 'sfax', 'sousse','hamammet', 'monastir', 'gabes'];
  filteredOptions: Observable<string[]>;
  displayBasic: boolean;
  display: boolean;


  showBasicDialog() {
    this.displayBasic = true;
}

showDialog() {
  this.display = true;
  this.displayBasic = false;
}

  jourvaleur: string;
  content: string;
  clientt: Client;
  Vehicules: Vehicule[] = [];
  specialisations: Specialisation[] = [];
  detailsspecialisation: DetailSpecialisation[] = [];
  selectedMarque: DetailSpecialisation[] = null;
  selectedModel : DetailSpecialisation;
    detailss: DetailSpecialisation[] = [];
    selectedVehicule: Vehicule = null;
    private cec: CarnetEntretienComponent;


  form: FormGroup;
  formErrors = {

};
validationMessages = {
};

pays: Adressepays[] = [];
selectedpays: Adressepays = null;
selectedville : Adressevilles = null;
selectedcite: Adressecities = null;
adressevilles: Adressevilles[] = [];
adressecites: Adressecities[] = [];
  constructor(private fb: FormBuilder ,private router: Router ,private adresseService: AdresseService,private userService: UserService, private clientService: ClientService , private vehiculesService: VehiculesService , private specialisationService: SpecialisationService) {

  }

  ngOnInit(): void {
    this.CreateVehiculeForm();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.adresseService.getpays()
    .subscribe(
      (data) => {
        this.pays = data;
      //  console.log('Retrives marques : ' + JSON.stringify(data));

    });

    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

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
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  selectpays: Adressepays;
  getville(){
    this.selectpays = this.selectedpays;
    console.log(this.selectpays);
    this.adresseService.getvillesofpays(this.selectpays.id).subscribe(
    data => {
      this.adressevilles = data;

    }
  );

  }
  selectvillex : Adressevilles;
  setvilleValue(){
    this.selectvillex = this.selectedville;
    console.log(this.selectvillex);
    this.adresseService.getcitiesofville(this.selectvillex.id).subscribe(
      data => {
        this.adressecites = data;

      });

  }
  selectcitex : Adressecities;
  setciteValue(){
    this.selectcitex = this.selectedcite;
    console.log(this.selectcitex);
  }

  selectAge: Specialisation;
  selectmodelx : DetailSpecialisation;

 /* getModel(){

    this.selectAge = this.selectedMarque;
    console.log(this.selectAge);


    this.specialisationService.getdetailspecialisation(this.selectAge.id).subscribe(
    data => {
      this.detailsspecialisation = data, console.log(data);

    }
  );

  }*/
  selectvec: Vehicule;
  selectspec: DetailSpecialisation[] = [];
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
      pays: [''],
      ville: [''],
      cite: ['']

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
    this.form.value.pays = this.selectpays;
    this.form.value.ville = this.selectvillex;
    this.form.value.cite = this.selectcitex;



     console.log(this.form.value);


   }




}
