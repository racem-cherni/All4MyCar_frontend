import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']
})
export class VehiculesComponent implements OnInit {

  form: FormGroup;


  constructor() { }

  ngOnInit(): void {
  }

}
