import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';
import { TransferService } from 'src/app/_services/transfer.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  private roles: string[];
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
  constructor(private router: Router , private authService: AuthService,
    // tslint:disable-next-line: align
    private tokenStorageService: TokenStorageService , private transfereService: TransferService) { }

  ngOnInit(): void {


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
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
      //  this.reloadPage();
        if (this.roles.includes('ROLE_USER')){
          window.location.href = '/All4MyCar/client/home';
         }
         else if (this.roles.includes('ROLE_PRESTATAIRE')){
          window.location.href = '/All4MyCar/prestataire/home';
         }
         else if (this.roles.includes('ROLE_ADMIN')){
          window.location.href = '/All4MyCarAdmin';
         }
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

  gotodashboardp(){
   /* this.position = 1;

    this.transfereService.setData(this.position);*/
    window.location.href ='/All4MyCar/prestataire/espace-prestataire/dashboardpres';

  }

  gotoprofil(){

   // this.transfereService.changeMessage(3);
    window.location.href ='/All4MyCar/client/espace-client/profil';


  }

  gotoprofilp(){
   // this.position = 3;

    //this.transfereService.setData(this.position);
    window.location.href ='/All4MyCar/prestataire/espace-prestataire/profilpres';

  }

  getPositionValue(){
    return this.position;
  }
}
