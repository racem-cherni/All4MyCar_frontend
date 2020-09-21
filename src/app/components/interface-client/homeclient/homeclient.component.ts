import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/entities/client';
import { Vehicule } from 'src/app/entities/vehicule';
import { ClientService } from 'src/app/_services/client.service';
import { UserService } from 'src/app/_services/user.service';
import { VehiculesService } from 'src/app/_services/vehicules.service';

@Component({
  selector: 'app-homeclient',
  templateUrl: './homeclient.component.html',
  styleUrls: ['./homeclient.component.css']
})
export class HomeclientComponent implements OnInit {

  content: string;
  clientt: Client;
  Vehicules: Vehicule[] = [];

  constructor(private userService: UserService, private clientService: ClientService , private vehiculesService: VehiculesService) { }

  ngOnInit(): void {
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
     .subscribe((data) => {this.clientt = data, console.log(data),
      this.vehiculesService.getVehiculess().subscribe((data) => {
        this.Vehicules = data,  console.log(data)} ,

        error => console.log(error));
    } , error => console.log(error));
  }

}
