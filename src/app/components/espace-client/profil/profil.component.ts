import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/entities/client';
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
 // date3: Date;
//  value7: string;
form: FormGroup;
client: Client ;
clientcopy: Client = null ;
showclientForm = true;
errMess: string;
@ViewChild('fform') formFormDirective ;

formErrors = {
    // tslint:disable-next-line: object-literal-key-quotes
    'firstNameclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'emailclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'CIN': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'date_permis': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'lastNameclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'telclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'adresseclt': ''
    // tslint:disable-next-line: object-literal-key-quotes

};

validationMessages = {
  // tslint:disable-next-line: object-literal-key-quotes
  'firstNameclt': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'First Name is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'First Name must be at least 2 characters long.',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'FirstName cannot be more than 25 characters long.'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'lastNameclt': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Last Name is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'Last Name must be at least 2 characters long.',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'Last Name cannot be more than 25 characters long.'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'CIN': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'cin is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'pattern':       'cin must contain only numbers.',
    // tslint:disable-next-line: object-literal-key-quotes
    'size':         'cin must contain  8 numbers'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'emailclt': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Email is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'email':         'Email not in valid format.'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'telclt': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Tel. number is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'pattern':       'Tel. number must contain only numbers.',
     // tslint:disable-next-line: object-literal-key-quotes
     'size':         'Tel. number must contain  8 numbers'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'adresseclt': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'adresse is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'adresse must be at least 2 characters long.',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'adresse cannot be more than 25 characters long.'
  },
};

/*
myForm = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])

  });*/


  // tslint:disable-next-line: whitespace
  constructor(private http: HttpClient, private clientService: ClientService ,private router: Router ,
     // tslint:disable-next-line: align
     private route: ActivatedRoute , private fb: FormBuilder ) {
      this.createformprofil() ;
      }



  get f(){

    return this.form.controls;

  }

  // tslint:disable-next-line: typedef
  onFileChange(event) {

    const reader = new FileReader();
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

  createformprofil(): void{
this.form = this.fb.group({
  firstNameclt:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ] ,
  emailclt: ['', [Validators.required, Validators.email] ] ,
  CIN: ['', [Validators.required, Validators.pattern] ]  ,
  date_permis: ['', [Validators.required] ]  ,
  lastNameclt: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ] ,
  telclt: ['', [Validators.required, Validators.pattern] ] ,
  adresseclt: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
  name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    photoclt: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])
});
this.form.valueChanges
.subscribe(data => this.onValueChanged(data));

this.onValueChanged();

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

  // tslint:disable-next-line: typedef
  onsubmitt() {
    this.client = this.form.value;
    console.log(this.client);
    this.clientService.submiteditprofil(this.client)
    .subscribe(client => {
      this.clientcopy = client ;
      this.client = null ;
      setTimeout(() => {
        this.clientcopy = null; this.showclientForm = true; }, 5000);     },
        error => console.log(error.status, error.message));
        // tslint:disable-next-line: align
        this.form.reset({
            firstNameclt: '',
            emailclt: '',
            CIN: '',
             datepermis: '',
            lastNameclt: '',
             telclt: '',
           adresseclt: '',
              photoclt: ''
        });
        // tslint:disable-next-line: align
        this.formFormDirective.reset();
    }




  }

