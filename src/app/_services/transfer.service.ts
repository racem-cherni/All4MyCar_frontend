import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(
    private router:Router,
  ) { }

  private messageSource = new BehaviorSubject(1);
  currentMessage = this.messageSource.asObservable();

  private data;

  changeMessage(message: number) {
    this.messageSource.next(message)
    console.log(message);


  }

  setData(data){
    this.data = data;
    console.log(data);
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }}
