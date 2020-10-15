import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Client } from 'src/app/entities/client';
import { ClientService } from 'src/app/_services/client.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-completeprofil',
  templateUrl: './completeprofil.component.html',
  styleUrls: ['./completeprofil.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class CompleteprofilComponent implements OnInit {
  isSuccessful = false;
  errorMessage = '';

  imageSrc: string;
clienttt : Client;
form: FormGroup;
client: Client ;
clientcopy: Client = null ;
showclientForm = true;
errMess: string;
public selectedIndex: number;
public iconColor: string;
@ViewChild('fform') formFormDirective ;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
profileSubmitted: boolean;
images=[];


  formErrors = {
    // tslint:disable-next-line: object-literal-key-quotes
    'firstNameclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'emailclt': '',
        // tslint:disable-next-line: object-literal-key-quotes
    'cin': '',
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
     'minlength':         'cin must contain  8 numbers',
     // tslint:disable-next-line: object-literal-key-quotes
     'maxlength':  'cin must contain 8 numbers'
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

  constructor(private http: HttpClient, private clientService: ClientService ,private router: Router ,
    private route: ActivatedRoute , private fb: FormBuilder ) {
      this.createformprofil() ;

     }

    clientt: Client;
    selectedFiless: FileList;

    selectedFiles: FileList;
    currentFile: File;

    get f(){

      return this.form.controls;

    }



  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });

    this.selectedFiles = null;
    this.clientt = new Client();

    this.selectedIndex=1;

    this.clientService.getclient()
   .subscribe((data) => {this.clienttt = data, console.log(data);
    if (this.clienttt!=null){
      this.clientt = this.clienttt;
    }
  if (this.clienttt.etat===0){
  this.profileSubmitted=true;
  this.selectedIndex=2
}
} , error => console.log(error));

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
      cin: ['', [Validators.required, Validators.pattern , Validators.minLength(8) , Validators.maxLength(8)] ]  ,
      date_permis: ['', [Validators.required] ]  ,
      lastNameclt: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ] ,
      telclt: ['', [Validators.required, Validators.pattern , Validators.minLength(8) , Validators.maxLength(8)] ] ,
      adresseclt: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
     // name: new FormControl('', [Validators.required, Validators.minLength(3)]),

        photoclt: new FormControl(''),
        photos: new FormControl(''),

      //  fileSource: new FormControl('', [Validators.required])
    });
    this.form.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

      }

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

      onsubmitt() {
        if (this.selectedFiles !== null && this.selectedFiless!=null){

        this.currentFile = this.selectedFiles.item(0);
        this.client = this.form.value;
        console.log(typeof(this.form.value.date_permis));

      //  console.log(this.client);
        this.clientService.submiteditprofil_completeprofil(this.client,  this.currentFile,this.selectedFiless)
        .subscribe(client => {
          this.clientcopy = client ;
          this.client = null ;


          setTimeout(() => {
            this.clientcopy = null; this.showclientForm = true;
          }, 5000);
          //  this.reload();
          this.profileSubmitted =true;

          this.ngOnInit();
          },
            error => console.log(error.status, error.message));
          }
          else{
            this.client = this.form.value;
            console.log(typeof(this.form.value.date_permis));

          //  console.log(this.client);
            this.clientService.submiteditprofilwithoutphoto_completeprofil(this.client)
            .subscribe(client => {
              this.clientcopy = client ;
              this.client = null ;
              setTimeout(() => {
                this.clientcopy = null; this.showclientForm = true;
              }, 5000);
               // this.reload();
               this.profileSubmitted =true;

               this.ngOnInit();
              },
                error => console.log(error.status, error.message));


          }
         this.selectedIndex=2;
         this.profileSubmitted=true;


        }

        reload(){
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/All4MyCar/client/completeprofil']);

      }


/*urls=[];
onselecte(e){
  this.selectedFiless = e.target.files;


  if(e.target.files){
    for(let i=0; i<File.length;i++){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[i]);
      reader.onload=(events:any)=>{
        this.urls.push(events.target.result);
      }
    }
  }

}*/

progressInfos = [];
message = '';
fileInfos: Observable<any>;

onFileChange(event) {

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

selectFiles(event): void {
  this.progressInfos = [];
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
removephotos(url){
  var files = Array.from(this.selectedFiless);
   console.log(url);
  let j = 0;
  for (let i = 0; i < this.selectedFiless.length; i++) {
    var item = this.selectedFiless[i];
    if (item != url) {
        files[j] = item;
        j++;
    }
  }
  //this.selectedFiless =  files.;

}
/*upload(idx, file): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

/*  uploadFiles(): void {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
*/
}
