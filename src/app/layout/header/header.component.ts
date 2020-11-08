import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';
import { TransferService } from 'src/app/_services/transfer.service';
import { ClientService } from 'src/app/_services/client.service';
import { Client } from 'src/app/entities/client';
import { PrestataireService } from 'src/app/_services/prestataire.service';
import { Prestataire } from 'src/app/entities/prestataire';
import { MatDialog } from '@angular/material/dialog';
import { RegistredialogComponent } from 'src/app/components/registredialog/registredialog.component';
import { User } from 'src/app/entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hide = true;
  buttonType: any;

  isSuccessful = false;
  isSignUpFailed = false;
  isloginSuccessful = false;
  isloginFailed = false;

registerform: FormGroup;
loginform: FormGroup;
userregister: User ;
userlogin: User ;
usercopy: User = null ;
showregisterForm = true;

errMess: string;
@ViewChild('fform') formFormDirective ;

formErrors = {
  // tslint:disable-next-line: object-literal-key-quotes
  'username': '',
  // tslint:disable-next-line: object-literal-key-quotes
  'date_carburant': '',
      // tslint:disable-next-line: object-literal-key-quotes
  'email': '',
      // tslint:disable-next-line: object-literal-key-quotes
  'password': '',
      // tslint:disable-next-line: object-literal-key-quotes
      'termes': ''
      // tslint:disable-next-line: object-literal-key-quotes
};

validationMessages = {
  // tslint:disable-next-line: object-literal-key-quotes
  'username': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Nom utilisateur est nécessaire.',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'Nom utilisateur doit comporter au moins 2 caractères.',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'Nom utilisateur ne peut pas contenir plus de 25 caractères'
  },

  // tslint:disable-next-line: object-literal-key-quotes
  'email': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Email est requis',
    // tslint:disable-next-line: object-literal-key-quotes
    'email':         'mail n est pas au format valide.'
  },
  // tslint:disable-next-line: object-literal-key-quotes
    'password': {
     // tslint:disable-next-line: object-literal-key-quotes
    'required':      'Mot de passe est requis',
    // tslint:disable-next-line: object-literal-key-quotes
    'minlength':     'Mot de passe doit comporter au moins 6 caractères',
    // tslint:disable-next-line: object-literal-key-quotes
    'maxlength':     'mot de passe ne peut pas contenir plus de 20 caractères'
  },
    // tslint:disable-next-line: object-literal-key-quotes
    'termes': {
    // tslint:disable-next-line: object-literal-key-quotes
    'required': ' vérifications est requis',
    // tslint:disable-next-line: object-literal-key-quotes
  }
};

  private roles: string[];
  registerpDialog : boolean;
  loginpDialog : boolean;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string = null;
  role: string = null;
  ////////////////////
  form: any = {};
  errorMessage = '';
  isLoginFailed = false;
  position : number = null;
  message : number;
  client: Client ;
  user: User;
  u : User;

  prestataire: Prestataire ;
  etat : Boolean ;
  id : number;
  constructor(public dialog: MatDialog,private router: Router , private authService: AuthService,private clientservice: ClientService,private tokenStorageService: TokenStorageService
     , private prestataireservice: PrestataireService,private transfereService: TransferService, private fb: FormBuilder) {

      }

      createregisterform(): void{
        this.registerform = this.fb.group({
          username:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)] ] ,
          email: ['', [Validators.required, Validators.email] ] ,
          password: ['', [Validators.required , Validators.minLength(6) , Validators.maxLength(20)] ]  ,
          termes: ['', [Validators.required] ] ,
        });
        this.registerform.valueChanges
        .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();

          }
          createloginform(): void{
            this.loginform = this.fb.group({
              username:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)] ] ,
              password: ['', [Validators.required , Validators.minLength(6) , Validators.maxLength(20)] ]  ,
            });
            this.loginform.valueChanges
            .subscribe(data => this.onloginValueChanged(data));

            this.onloginValueChanged();

              }

              onloginValueChanged(data?: any) {
                if (!this.loginform) { return; }
                const form = this.loginform;
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

          onValueChanged(data?: any) {
            if (!this.registerform) { return; }
            const form = this.registerform;
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
          onSubmitclient(): void {
            this.userregister = this.registerform.value;

            this.authService.register(this.userregister).subscribe(
              data => {
                console.log(data);
                this.usercopy = data ;
                this.userregister = null ;
                this.isSuccessful = true;
                this.isSignUpFailed = false;
                setTimeout(() => {
                  this.usercopy = null; this.showregisterForm = true; }, 5000); },
                  error => {console.log(error.status, error.message), this.isSuccessful = false; this.isSignUpFailed = false;
                  });
                  this.formFormDirective.reset();

          }
          onSubmitpres(): void {
            this.userregister = this.registerform.value;
            this.authService.registerprestataire(this.userregister).subscribe(
              data => {
                console.log(data);
                this.usercopy = data ;
                this.userregister = null ;
                this.isSuccessful = true;
                this.isSignUpFailed = false;
                setTimeout(() => {
                  this.usercopy = null; this.showregisterForm = true; }, 5000); },
                  error => {console.log(error.status, error.message), this.isSuccessful = false; this.isSignUpFailed = false;
                  });
                this.formFormDirective.reset();

          }
          onSubmitt(buttonType): void {
            if   (buttonType === 'Next') {
                 this.onSubmitclient();
            }
            if (buttonType === 'Previous'){
                 this.onSubmitpres();
            }

        }




     openDialog() {
      this.dialog.open(RegistredialogComponent, {
      });
    }
//try

  ngOnInit(): void {
    this.createloginform();

    this.createregisterform() ;
    // tslint:disable-next-line: align
  this.clientservice.getclient()
  .subscribe((data) => {this.client = data, console.log(data); } , error => console.log(error));

  this.prestataireservice.getprestataire()
   .subscribe((data) => {this.prestataire = data, console.log(data)} , error => console.log(error));


    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.role=this.roles[0];
      this.username = user.username;
    }



    this.transfereService.currentMessage.subscribe(message => this.message = message)
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.href = '/All4MyCar/home';  }

  onSubmit(): void {
    this.userlogin = this.loginform.value;
    this.authService.login(this.userlogin).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        this.id = this.tokenStorageService.getUser().id;
        console.log(this.id);
     // u = this.clientservice.getUserr(this.id);
      this.clientservice.getUserr(this.id)
   .subscribe((data) => {this.u = data, console.log(data); console.log(this.u);
    this.etat = this.u.etat;console.log(this.etat);


      //  this.reloadPage();
        if (this.roles.includes('ROLE_USER') && this.etat===true){
          window.location.href = '/All4MyCar/client/home';
         }
         else
         if (this.roles.includes('ROLE_USER') && this.etat === false){
          window.location.href = '/All4MyCar/client/completeprofil';
         }
         else
          if (this.roles.includes('ROLE_PRESTATAIRE') && this.etat===true ){
          window.location.href = '/All4MyCar/prestataire/home';
         }
         else
        if (this.roles.includes('ROLE_PRESTATAIRE') && this.etat===false){
          window.location.href = '/All4MyCar/prestataire/completeprofil';
         }else
          if (this.roles.includes('ROLE_ADMIN')){
          window.location.href = '/dash/dashboard';
         }
        } , error => console.log(error),);
        },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }


  reloadPage(): void {
    window.location.reload();
  }

  gotodashboardc(){

   // this.transfereService.changeMessage(1);

   window.location.href ='/All4MyCar/client/espace-client/dashboard';
  }

  gotohomeclient(){

    // this.transfereService.changeMessage(1);

    window.location.href ='/All4MyCar/client/home';
   }

   gotohomeprestataire(){

    // this.transfereService.changeMessage(1);

    window.location.href ='/All4MyCar/prestataire/home';
   }
   gotoprescompleteprofil() {
    window.location.href ='/All4MyCar/prestataire/completeprofil';

   }
   gotoclientcompleteprofil(){
    window.location.href ='/All4MyCar/client/completeprofil';

   }

  gotodashboardp(){
   /* this.position = 1;

    this.transfereService.setData(this.position);*/
    window.location.href ='/All4MyCar/prestataire/espace-prestataire/dashboardpres';

  }

  gotordvprestations(){
    /* this.position = 1;

     this.transfereService.setData(this.position);*/
     window.location.href ='/All4MyCar/prestataire/rdv';

   }
  gotoprofil(){

   // this.transfereService.changeMessage(3);
    window.location.href ='/All4MyCar/client/espace-client/profil';


  }
  gotocarnetentretien(){
    window.location.href ='/All4MyCar/client/carnetentretien';

  }

  gotoprofilp(){
   // this.position = 3;

    //this.transfereService.setData(this.position);
    window.location.href ='/All4MyCar/prestataire/espace-prestataire/profilpres';

  }

  getPositionValue(){
    return this.position;
  }
  dialogpegister(){
    this.registerpDialog = true;

  }
  dialoglogin(){
    this.loginpDialog = true;

  }
  termesetconditions(){
    this.registerpDialog = false;

  }
  dialogplogin(){
    this.registerpDialog = false;
    this.loginpDialog = true;


  }
  returnregister(){
    this.loginpDialog = false;
    this.registerpDialog = true;


  }
}
