import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/entities/client';
import { Vehicule } from 'src/app/entities/vehicule';
import { VehiculeMarque } from 'src/app/entities/vehicule-marque';
import { VehiculeModel } from 'src/app/entities/vehicule-model';
import { ClientService } from 'src/app/_services/client.service';
import { VehiculesService } from 'src/app/_services/vehicules.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogvehiculeComponent } from 'src/app/components/interface-client/espace-client/vehicules/dialogvehicule/dialogvehicule.component';





@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']
})
export class VehiculesComponent implements OnInit {
  errMess: string;
  private vc : VehiculesComponent;

  pokemonControl = new FormControl();
  pokemonGroups: PokemonGroup[] = [
    {
      name: 'Diesel',
      pokemon: [
        {value: 'Diesel 2.5L 200 hp AT_L5', viewValue: 'Diesel 2.5L 200 hp AT/L5'},
        {value: 'Diesel 3.0L 250 hp MT_L5', viewValue: 'Diesel 3.0L 250 hp MT/L5'}
      ]
    },
    {
      name: 'Essence',
      pokemon: [
        {value: 'Essence 2.5L 250 hp MT_L5', viewValue: 'Essence 2.5L 250 hp MT/L5'},
        {value: 'Essence 3.0L 250 hp MT_L5', viewValue: 'Essence 3.0L 250 hp MT/L5'}
      ]
    }
  ];


  vehicule: Vehicule ;
  vehiculecopy: Vehicule = null ;
  showvehiculeForm = true;
  clientt: Client;

  form: FormGroup;
  formErrors = {

};
validationMessages = {
};
  vehiculemarque: VehiculeMarque[] = [];
  vehiculemodel: VehiculeModel[] = [];
  selectedMarque: VehiculeMarque = null;
  selectedModel : VehiculeModel = null;
  selectedCarburant : Vehicule['carburant'];
  search: any;
  Vehicules: Vehicule[] = [];
  vehiculmarque: VehiculeMarque ;

  // tslint:disable-next-line: whitespace
  // tslint:disable-next-line: max-line-length
  constructor(public dialog: MatDialog , private http: HttpClient, private clientService: ClientService , private vehiculesService: VehiculesService , private router: Router ,
    // tslint:disable-next-line: align
    private route: ActivatedRoute , private fb: FormBuilder ) { 
      //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.CreateVehiculeForm();

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



    openDialog(nut: number) {
      this.dialog.open(DialogvehiculeComponent, {
        data: nut
      });
    }


  ngOnInit(): void {



    this.clientt = new Client();
    this.clientService.getclient()
     .subscribe((data) => {this.clientt = data, console.log(data),
      this.vehiculesService.getVehiculess().subscribe((data) => {
        this.Vehicules = data,  console.log(data)} ,

        error => console.log(error));
    } , error => console.log(error));

     // tslint:disable-next-line: align




  // tslint:disable-next-line: align




  // tslint:disable-next-line: align
  this.vehiculesService.getListVehicule()
   .subscribe((data) => {this.vehiculemarque = data, console.log(data)});


}

  // tslint:disable-next-line: typedef
  CreateVehiculeForm(){
    this.form = this.fb.group({
      marque: [''],
      model: [''],
      date_immatriculation: [''],
      date_assurance: [''],
      type_vehicule: [''],
      carburant: [''],
      immatriculation: [''],
      galerie_photo: new FormControl('', [Validators.required]),
      assureur: [''],
      num_contrat_assurance: [''],
    });
    this.form.valueChanges
.subscribe(data => this.onValueChanged(data));

// tslint:disable-next-line: align
this.onValueChanged();
  }
  // tslint:disable-next-line: member-ordering
  selectAge: VehiculeMarque;
  selectmodelx : VehiculeModel;
  selectedCarburantx : Vehicule['carburant'];

  // tslint:disable-next-line: typedef
  getModel(){
    //const curItem = this.vehiculemarque.find(value => value.id === id);
    this.selectAge = this.selectedMarque;
    console.log(this.selectAge);

  //const vehiculename = this.form.value;
    const vehiculename = this.form.value.marque.name;
 // this.form.controls.myControl.setValue(curItem)

    this.vehiculesService.getListVehiculeModel(this.selectAge.name.toString()).subscribe(
    data => {
      this.vehiculemodel = data;

     // this.form.get('model').setValue(data[0]);
    }
  );

  }

  setModelValue(){
    this.selectmodelx = this.selectedModel;
    console.log(this.selectmodelx);

  }
  setCarburantValue(){
    this.selectedCarburantx = this.selectedCarburant;
    console.log(this.selectedCarburantx);

  }

  removeVehicule(number : number){
this.vehiculesService.removeVehicule(number).subscribe(data => {
  console.log(data);
  this.ngOnInit();

});
/*setTimeout(() => {
  console.log("Delete ");
});*/
/*this.router.routeReuseStrategy.shouldReuseRoute = function () {return false;};
this.router.navigateByUrl('/All4MyCar/client/espace-client/vehicules');
this.ngOnInit();*/
//.reload();
}
  // tslint:disable-next-line: typedef
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
   this.currentFile = this.selectedFiles.item(0);
    this.form.value.marque = this.selectAge;
    this.form.value.model   = this.selectmodelx;
    this.form.value.carburant   = this.selectedCarburantx;
    this.vehicule = this.form.value;

    console.log(this.vehicule.carburant);
    this.vehiculesService.addvehiculewithphto(this.vehicule ,this.currentFile )
    .subscribe(vehicule => {
      this.vehiculecopy = vehicule ;
      this.vehicule = null ;
      setTimeout(() => {
        this.vehiculecopy = null; this.showvehiculeForm = true; }, 5000);   this.ngOnInit();      },
        error => console.log(error.status, error.message));
        // tslint:disable-next-line: align
        this.form.reset({
            marque: '',
            model: '',
            date_immatriculation: '',
            date_assurance: '',
            type_vehicule: '',
            carburant: '',
            immatriculation: '',
            galerie_photo: '',
            assureur: '',
            num_contrat_assurance: '',
        });
       /* this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.router.navigateByUrl('/All4MyCar/client/espace-client/vehicules');
        
        */
       // this.reload();
       this.ngOnInit();

  }

refrech(){
  this.clientt = new Client();
    this.clientService.getclient()
     .subscribe((data) => {this.clientt = data, console.log(data),
      this.vehiculesService.getVehiculess().subscribe((data) => {
        this.Vehicules = data, console.log(data)} ,

        error => console.log(error));
    } , error => console.log(error));

    }

reload(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/All4MyCar/client/espace-client/vehicules']);

}




}
interface Pokemon {
  value: string;
  viewValue: string;
}

interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}
