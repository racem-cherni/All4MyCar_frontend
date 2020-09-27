import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rdvpres',
  templateUrl: './rdvpres.component.html',
  styleUrls: ['./rdvpres.component.css']
})
export class RdvpresComponent implements OnInit {

  showVar: number = 2;

  constructor() { }

  ngOnInit(): void {
  }

  ShowAll(){
    this.showVar =1;
  }
  ShowToday(){
    this.showVar =2;
  }
  ShowWeek(){
    this.showVar =3;
  }
  ShowMonth(){
    this.showVar =4;
  }
}
