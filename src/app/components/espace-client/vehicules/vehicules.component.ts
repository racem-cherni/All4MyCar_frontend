import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculeMarque } from 'src/app/entities/vehicule-marque';
import { VehiculeModel } from 'src/app/entities/vehicule-model';
import { VehiculesService } from 'src/app/_services/vehicules.service';


@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']
})
export class VehiculesComponent implements OnInit {

  form: FormGroup;
  vehiculemarque: VehiculeMarque[] =[];
  vehiculemodel: VehiculeModel[] =[];
  selectedMarque: VehiculeMarque;


  constructor(private http: HttpClient, private vehiculesService: VehiculesService ,private router: Router ,
    // tslint:disable-next-line: align
    private route: ActivatedRoute , private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.CreateVehiculeForm();
  
    this.vehiculesService.getAllVehiculeMarqueModel()
    .subscribe(
      (data) => { 
        this.vehiculemarque = data;
        console.log('Retrives marques : ' + JSON.stringify(data));
      
    }
      );
  
  
  
  /*this.vehiculesService.getAllVehiculeMarqueModel()
   .subscribe((data) => {this.vehiculemarque = data, console.log(data)});
*/
    
}

  CreateVehiculeForm(){
    this.form = this.fb.group({
      marque:[''],
      model:[''],
      annee_de_sortie:[''],
      date_assurance:[''],
      immatriculation:[''],
      galerie_photo:[''],
      assureur:[''],
      num_contrat_assurance:[''],
    });
  }
  selectAge: VehiculeMarque;

  getModel(){ 
    //const curItem = this.vehiculemarque.find(value => value.id === id);
    this.selectAge = this.selectedMarque;
    console.log(this.selectAge);

  //const vehiculename = this.form.value;
  const vehiculename =this.form.value.marque.name;
 // this.form.controls.myControl.setValue(curItem)

  this.vehiculesService.getModels(this.selectAge.name.toString()).subscribe(
    data => {
      this.vehiculemodel = data;
     
      this.form.get('model').setValue(data[0]);
    }
  );

  }

}
