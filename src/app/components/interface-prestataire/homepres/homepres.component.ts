import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepres',
  templateUrl: './homepres.component.html',
  styleUrls: ['./homepres.component.css']
})
export class HomepresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gotordv(){
    window.location.href ='/All4MyCar/prestataire/rdv';

  }

}
