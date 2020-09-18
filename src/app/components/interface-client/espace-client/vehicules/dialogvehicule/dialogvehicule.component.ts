import { Component, Inject, OnInit } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Vehicule } from 'src/app/entities/vehicule';
import { VehiculesService } from 'src/app/_services/vehicules.service';



@Component({
  selector: 'app-dialogvehicule',
  templateUrl: './dialogvehicule.component.html',
  styleUrls: ['./dialogvehicule.component.css']
})
export class DialogvehiculeComponent implements OnInit {
  Vehicule: Vehicule ;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private vehiculesService: VehiculesService) { }
  ngOnInit(): void {
    this.vehiculesService.getvehiculebyid(this.data)
    .subscribe((dat) => {this.Vehicule = dat, console.log(dat)});
  }


}
