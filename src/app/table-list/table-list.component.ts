
import { Component, OnInit,} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../entities/user';
import { AdminService } from '../_services/admin.service';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  constructor(private adminservice: AdminService) { }

userclient: User[]=[];
userprestataire: User[]=[];
checked: boolean = false;
formErrors = {


};

validationMessages = {

};


  form: FormGroup;
  isSuccessful = false;

  ngOnInit() {
    this.adminservice.getClientt()
    .subscribe((data) => {this.userclient = data, console.log(data)} , error => console.log(error));
    this.adminservice.getPrestataire()
    .subscribe((data) => {this.userprestataire = data, console.log(data)} , error => console.log(error));

  }

}
