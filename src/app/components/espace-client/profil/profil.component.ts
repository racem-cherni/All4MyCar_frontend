import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/_services/client.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  isSuccessful = false;
  errorMessage = '';

  imageSrc: string;
  date3: Date;
  value7: string;
form: any;

myForm = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])

  });

  constructor(private http: HttpClient, private clientService: ClientService) { }
  get f(){

    return this.myForm.controls;

  }

  // tslint:disable-next-line: typedef
  onFileChange(event) {

    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {


        this.imageSrc = reader.result as string;

        this.myForm.patchValue({

          fileSource: reader.result

        });


      };
    }
  }


  ngOnInit(): void {
  }
  onSubmit(): void {
    this.clientService.edit_client(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;

      },
      err => {
        this.errorMessage = err.error.message;
      }
    );

  }

}
