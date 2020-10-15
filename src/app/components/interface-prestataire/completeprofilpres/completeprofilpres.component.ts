import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Adressecities } from 'src/app/entities/adressecities';
import { Adressepays } from 'src/app/entities/adressepays';
import { Adressevilles } from 'src/app/entities/adressevilles';
import { Garage } from 'src/app/entities/garage';
import { Prestataire } from 'src/app/entities/prestataire';
import { Specialisation } from 'src/app/entities/specialisation';
import { User } from 'src/app/entities/user';
import { AdresseService } from 'src/app/_services/adresse.service';
import { GarageService } from 'src/app/_services/garage.service';
import { PrestataireService } from 'src/app/_services/prestataire.service';
import { SpecialisationService } from 'src/app/_services/specialisation.service';

@Component({
  selector: 'app-completeprofilpres',
  templateUrl: './completeprofilpres.component.html',
  styleUrls: ['./completeprofilpres.component.css']
})
export class CompleteprofilpresComponent implements OnInit {

  specialisations: Specialisation[] = [];

    specialisat: string ;
    isSuccessful = false;
    errorMessage = '';
    isSignUpFailed = false;
    specialisathou: string[] ;

    garageSubmitted : boolean;
    imageSrc: string;
    profileSubmitted: boolean;
    selectedIndex:number;
   // date3: Date;
   firstFormGroup: FormGroup;
   secondFormGroup : FormGroup;
   uploadedphoto :Boolean;
  //  value7: string;
  form: FormGroup;
  prestataire: Prestataire ;
  presss : Prestataire;
  prestatairecopy: Prestataire = null ;
  showprestataireForm = true;
  errMess: string;
  photopress : string ='';
  selectspecx : string;
  @ViewChild('fform') formFormDirective ;
  isLinear = false;
  images=[];
  imagess=[];

  selectedFiless = null;

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
    constructor(private http: HttpClient, private prestataireservice: PrestataireService ,private router: Router ,private specialisationService: SpecialisationService,
       // tslint:disable-next-line: align
       private route: ActivatedRoute , private fb: FormBuilder ,
       private garageService: GarageService,private adresseService: AdresseService,) {
        this.createformprofil() ;


        }
    press: Prestataire;
    user: User;
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
      this.uploadedphoto=true;
    }


    ngOnInit(): void {


      this.profileSubmitted=false;
      this.garageSubmitted=false;
      this.uploadedphoto = false;
      this.firstFormGroup = this.fb.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this.fb.group({
        secondCtrl: ['', Validators.required]
      });
      this.selectedFiles = null ;
      this.press = new Prestataire();
      this.selectedIndex=1;
      this.prestataireservice.getUser()
      .subscribe((data) => {this.user = data, console.log(data)});
      this.specialisationService.getspecialisations()
      .subscribe((data) => {this.specialisations = data, console.log(data); });
      this.prestataireservice.getprestataire()
     .subscribe((data) => {this.presss = data, console.log(data);
      if (this.presss!=null){
        this.press = this.presss;

     console.log("sal "+this.press.specialisations.toString());
      this.specialisathou =this.press.specialisations.split(',');
      this.photopress = this.press.photopres;
    }
   if (this.presss.etat===0){
    this.profileSubmitted=true;
    this.selectedIndex=2 ;
  }

    } , error => console.log(error));

    /////////////////////////////////
    ////////Garage Part /////////
    /////////////////////////////
    this.CreateGarageForm();

    this.garageService.getGarage()
    .subscribe((data) => {this.garagee = data, console.log(data);
      if (this.garagee.etat===0){
        this.garageSubmitted=true;
        this.selectedIndex=3 ;
      }
      console.log(this.garageSubmitted);});
  console.log("garage :"+this.garagee);




    this.adresseService.getpays()
    .subscribe(
      (data) => {
        this.pays = data;
      //  console.log('Retrives marques : ' + JSON.stringify(data));

    });
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

    photocin: new FormControl(''),



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

      if (this.selectedFiles !== null && this.selectedFiless !== null){
      this.currentFile = this.selectedFiles.item(0);
      this.prestataire = this.form.value;
      this.isSuccessful = true;
      this.isSignUpFailed = false;

      if ( this.selectspecx != null){
      this.form.value.specialisations = this.selectspecx;
      }else{ this.form.value.specialisations = this.specialisathou; }
      console.log(this.prestataire);
      this.prestataireservice.submiteditprofil_completeprofil(this.prestataire,  this.currentFile, this.selectedFiless)
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
      this.selectedIndex=2;
      this.profileSubmitted=true;
    }


    selectFiles(event): void {
      this.selectedFiless = event.target.files;
      console.log(this.selectedFiless);
      if (event.target.files && event.target.files[0]) {

        var filesAmount = event.target.files.length;

        for (let i = 0; i < filesAmount; i++) {

                var reader = new FileReader();
                reader.onload = (event:any) => {

                  console.log(event.target.result);

                   this.images.push(event.target.result);

                   console.log("image"+this.images);
                   this.form.patchValue({

                      fileSource: this.images

                   });

                }



                reader.readAsDataURL(event.target.files[i]);

        }

    }

    }

///////////
//////////////////////////////////
/// GARAGE PART /////////////////
/////////////////////////////////
    displaygarage: boolean;


    showgarageDialog() {
      this.displaygarage = true;
  }

    garagecopy: Garage = null ;
    pays: Adressepays[] = [];
    selectedpays: Adressepays = null;
    selectedville : Adressevilles = null;
    selectedcite: Adressecities = null;
    adressevilles: Adressevilles[] = [];
    adressecites: Adressecities[] = [];
    showGarageForm = true;
    garage: Garage;
    garagee: Garage=null;

    formm: FormGroup;
    formErrorss = {
    }
    validationMessagess = {
    };
    selecteddFiles = null;

  currenttFile: File;
  imageSrcc: string;

  get ff(){

    return this.formm.controls;

  }

  onFileChangee(event) {


    this.selecteddFiles = event.target.files;
    console.log(this.selecteddFiles);
    if (event.target.files && event.target.files[0]) {

      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {

              var reader = new FileReader();
              reader.onload = (event:any) => {

                console.log(event.target.result);

                 this.imagess.push(event.target.result);

                 console.log("image"+this.imagess);
                 this.form.patchValue({

                    fileSource: this.imagess

                 });

              }



              reader.readAsDataURL(event.target.files[i]);

            }
  }
}


  CreateGarageForm(){
    this.formm = this.fb.group({
      Nbr_Mecaniciens: [''],
      année_Experience: [''],
      date_ouverture: [''],
      description:[''],
      pays: [''],
      ville: [''],
      adressecite: ['']

    });
    this.formm.valueChanges
.subscribe(data => this.onValueChangedd(data));

// tslint:disable-next-line: align
this.onValueChangedd();
  }


  onValueChangedd(data?: any) {
    if (!this.formm) { return; }
    const formm = this.formm;
    for (const field in this.formErrorss) {
      if (this.formErrorss.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrorss[field] = '';
        const control = formm.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessagess[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrorss[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  selectpays: Adressepays;
  getville(){
    this.selectpays = this.selectedpays;
    console.log(this.selectpays);
    this.adresseService.getvillesofpays(this.selectpays.id).subscribe(
    data => {
      this.adressevilles = data;

    }
  );

  }
  selectvillex : Adressevilles;
  setvilleValue(){
    this.selectvillex = this.selectedville;
    console.log(this.selectvillex);
    this.adresseService.getcitiesofville(this.selectvillex.id).subscribe(
      data => {
        this.adressecites = data;

      });

  }
  selectcitex : Adressecities;
  setciteValue(){
    this.selectcitex = this.selectedcite;
    console.log(this.selectcitex);
  }

  onsubmit(){

console.log(this.formm.value);
     this.garage= this.formm.value;
     console.log(this.garage);
     console.log( this.selecteddFiles);

     //console.log(this.vehicule.carburant);
     this.garageService.submiteditgarage_completeprofile(this.garage, this.selecteddFiles)
     .subscribe(garage => {
       this.garagecopy = garage ;
       this.garage = null ;

       setTimeout(() => {
         this.garagecopy = null; this.showGarageForm = true;  }, 5000);     },
         error => console.log(error.status, error.message));
         // tslint:disable-next-line: align
         this.garageSubmitted=true;
         this.selectedIndex=3;
   }


}
