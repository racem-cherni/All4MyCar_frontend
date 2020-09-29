import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Adressecities } from 'src/app/entities/adressecities';
import { Adressepays } from 'src/app/entities/adressepays';
import { Adressevilles } from 'src/app/entities/adressevilles';
import { Garage } from 'src/app/entities/garage';
import { AdresseService } from 'src/app/_services/adresse.service';
import { GarageService } from 'src/app/_services/garage.service';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {

  displaygarage: boolean;


  showgarageDialog() {
    this.displaygarage = true;
}

  garagecopy: Garage = null ;
  pays: Adressepays[] = [];
  selectedpays: Adressepays = null;
  selectedville : Adressevilles = null;
  selectedcite: Adressecities = null;
  adressevilles: Adressevilles[] = [];
  adressecites: Adressecities[] = [];
  showGarageForm = true;
  garage: Garage;
  garagee: Garage=null;

  form: FormGroup;
  formErrors = {

};
validationMessages = {
};

  constructor(private http: HttpClient, private garageService: GarageService,private adresseService: AdresseService, private route: ActivatedRoute , private fb: FormBuilder) {

   }

  ngOnInit(): void {
    this.CreateGarageForm();

    this.garageService.getGarage()
    .subscribe((data) => {this.garagee = data, console.log(data)});





    this.adresseService.getpays()
    .subscribe(
      (data) => {
        this.pays = data;
      //  console.log('Retrives marques : ' + JSON.stringify(data));

    });

  }
  selectedFiles: FileList;
  currentFile: File;
  imageSrc: string;




  get f(){

    return this.form.controls;

  }

  // tslint:disable-next-line: typedef
  onFileChange(event) {


    const reader = new FileReader();
    this.selectedFiles = event.target.files;

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {


        this.imageSrc = reader.result as string;

        this.form.patchValue({

          fileSource: reader.result

        });


      };
    }
  }
  CreateGarageForm(){
    this.form = this.fb.group({
      Nbr_Mecaniciens: [''],
      année_Experience: [''],
      date_ouverture: [''],
      addresse: [''],
      photo_garage: new FormControl('', [Validators.required]),
      adressecite: [''],
      description:[''],
      nom:['']

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
  onsubmit(){
    this.currentFile = this.selectedFiles.item(0);
console.log(this.form.value);
     this.garage= this.form.value;
     console.log(this.garage);

     //console.log(this.vehicule.carburant);
     this.garageService.submiteditgarage(this.garage, this.currentFile)
     .subscribe(garage => {
       this.garagecopy = garage ;
       this.garage = null ;
       setTimeout(() => {
         this.garagecopy = null; this.showGarageForm = true; }, 5000);     },
         error => console.log(error.status, error.message));
         // tslint:disable-next-line: align

   }

}
