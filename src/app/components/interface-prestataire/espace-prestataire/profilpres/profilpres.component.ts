import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Prestataire } from 'src/app/entities/prestataire';
import { Specialisation } from 'src/app/entities/specialisation';
import { PrestataireService } from 'src/app/_services/prestataire.service';
import { SpecialisationService } from 'src/app/_services/specialisation.service';

@Component({
  selector: 'app-profilpres',
  templateUrl: './profilpres.component.html',
  styleUrls: ['./profilpres.component.css']
})
export class ProfilpresComponent implements OnInit {

  specialisations: Specialisation[] = [];

  specialisat: string ;
  isSuccessful = false;
  errorMessage = '';
  isSignUpFailed = false;
  specialisathou: string[] ;


  imageSrc: string;
 // date3: Date;
//  value7: string;
form: FormGroup;
prestataire: Prestataire ;
prestatairecopy: Prestataire = null ;
showprestataireForm = true;
errMess: string;
photopress : string ='';
selectspecx : string;
@ViewChild('fform') formFormDirective ;

formErrors = {
    // tslint:disable-next-line: object-literal-key-quotes
    'firstNamepres': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'emailpres': '',
        // tslint:disable-next-line: object-literal-key-quotes

    'date_permis': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'lastNamepres': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'telpres': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'adressepres': '',
    // tslint:disable-next-line: object-literal-key-quotes
    'specialisations': '',
     // tslint:disable-next-line: object-literal-key-quotes
     'cin': ''


};

validationMessages = {
  // tslint:disable-next-line: object-literal-key-quotes
  'firstNamepres': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'First Name is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'First Name must be at least 2 characters long.',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'FirstName cannot be more than 25 characters long.'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'lastNamepres': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Last Name is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'Last Name must be at least 2 characters long.',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'Last Name cannot be more than 25 characters long.'
  },

  // tslint:disable-next-line: object-literal-key-quotes
  'emailpres': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Email is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'email':         'Email not in valid format.'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'telpres': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Tel. number is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'pattern':       'Tel. number must contain only numbers.',
     // tslint:disable-next-line: object-literal-key-quotes
     'minlength':         'cin must contain  8 numbers',
     // tslint:disable-next-line: object-literal-key-quotes
     'maxlength':  'cin must contain 8 numbers'
  },
  // tslint:disable-next-line: object-literal-key-quotes
  'adressepres': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'adresse is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'adresse must be at least 2 characters long.',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'adresse cannot be more than 25 characters long.'
  },
    // tslint:disable-next-line: object-literal-key-quotes

    // tslint:disable-next-line: object-literal-key-quotes
    'specialisations': {
      // tslint:disable-next-line: object-literal-key-quotes
      'required':      'adresse is required.',
      // tslint:disable-next-line: object-literal-key-quotes
    },
    // tslint:disable-next-line: object-literal-key-quotes
  'cin': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'cin is required.',
    // tslint:disable-next-line: object-literal-key-quotes
    'pattern':       'cin must contain only numbers.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':         'cin must contain  8 numbers',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':  'cin must contain 8 numbers'
  },
};

/*
myForm = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])

  });*/


  // tslint:disable-next-line: whitespace
  constructor(private http: HttpClient, private prestataireservice: PrestataireService ,private router: Router ,private specialisationService: SpecialisationService
     // tslint:disable-next-line: align
     ,private route: ActivatedRoute , private fb: FormBuilder ) {
      this.createformprofil() ;


      }
  press: Prestataire;

  selectedFiles: FileList;
  currentFile: File;
  filee : File;


  get f(){

    return this.form.controls;

  }

  // tslint:disable-next-line: typedef
  onFileChange(event) {
    console.log("houssem  " + event.target.files);
    const reader = new FileReader();
    this.selectedFiles = event.target.files;

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
    this.selectedFiles = null ;
    this.specialisationService.getspecialisations()
    .subscribe((data) => {this.specialisations = data, console.log(data); });
    this.press = new Prestataire();
    this.prestataireservice.getprestataire()
   .subscribe((data) => {this.press = data, console.log(data)
   console.log("sal "+this.press.specialisations.toString());
    this.specialisathou =this.press.specialisations.split(',');
    this.photopress = this.press.photopres;
  } , error => console.log(error));
  }

  onSubmit(): void {
    this.form.value.specialisations = this.specialisat;

    this.prestataireservice.edit_prestataire(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;

      },
      err => {
        this.errorMessage = err.error.message;
      }
    );

  }

  setSpecializationValue(){
this.selectspecx = this.specialisathou.toString();
console.log(this.selectspecx);
  }

  createformprofil(): void{
this.form = this.fb.group({
  firstNamepres:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ] ,
  lastNamepres: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ] ,
  adressepres: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
  emailpres: ['', [Validators.required, Validators.email] ] ,
  telpres: ['', [Validators.required, Validators.pattern , Validators.minLength(8) , Validators.maxLength(8)] ] ,
  photopres: new FormControl(''),
  specialisations: ['', [Validators.required] ] ,
  cin: ['', [Validators.required, Validators.pattern , Validators.minLength(8) , Validators.maxLength(8)] ]  ,







 // name: new FormControl('', [Validators.required, Validators.minLength(3)]),


  //  fileSource: new FormControl('', [Validators.required])
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

    if (this.selectedFiles !== null){
    this.currentFile = this.selectedFiles.item(0);
    this.prestataire = this.form.value;
    this.isSuccessful = true;
    this.isSignUpFailed = false;

    if ( this.selectspecx != null){
    this.form.value.specialisations = this.selectspecx;
    }else{ this.form.value.specialisations = this.specialisathou; }
    console.log(this.prestataire);
    this.prestataireservice.submiteditprofil(this.prestataire,  this.currentFile)
    .subscribe(client => {
      this.prestatairecopy = client ;
      this.prestataire = null ;
      setTimeout(() => {
        this.prestatairecopy = null; this.showprestataireForm = true; }, 5000);     },
        error => console.log(error.status, error.message));
        // tslint:disable-next-line: align
        // tslint:disable-next-line: align
      //  this.formFormDirective.reset();
    }else {
    this.prestataire = this.form.value;
    this.isSuccessful = true;
    this.isSignUpFailed = false;

    if ( this.selectspecx != null){
    this.form.value.specialisations = this.selectspecx;
    }else{ this.form.value.specialisations = this.specialisathou; }
    console.log(this.prestataire);
    this.prestataireservice.submiteditprofilwithoutphoto(this.prestataire)
    .subscribe(client => {
      this.prestatairecopy = client ;
      this.prestataire = null ;
      setTimeout(() => {
        this.prestatairecopy = null; this.showprestataireForm = true; }, 5000);     },
        error => console.log(error.status, error.message));
        // tslint:disable-next-line: align
        // tslint:disable-next-line: align
      //  this.formFormDirective.reset();


    }
  }


}
