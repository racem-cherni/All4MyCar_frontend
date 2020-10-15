
import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar-admin/sidebar-admin.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AdminService } from 'src/app/_services/admin.service';
import { AdminComponent } from 'src/app/admin/admin.component';
import { Admin } from 'src/app/entities/admin';
import { Client } from 'src/app/entities/client';
import { Prestataire } from 'src/app/entities/prestataire';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  cities: City[];

    selectedCity1: City;
   nbrdemandesinscripsnotifs: number ;
   clientdemandesnotifs: Client[]= null;
prestatairedemandesnotifs: Prestataire[]= null ;
  private listTitles: any[];

    location: Location;
    admin : Admin;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location,  private element: ElementRef, private router: Router,private tokenStorageService: TokenStorageService , private adminservice : AdminService) {
      this.location = location;
          this.sidebarVisible = false;



          this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];

        }

    ngOnInit(){
      this.adminservice.getadmin()
      .subscribe((data) => {this.admin = data, console.log(data)} , error => console.log(error));
      this.adminservice.getClientinscripnotifs()
      .subscribe((data) => {this.clientdemandesnotifs = data, console.log(data)} , error => console.log(error));
      this.adminservice.getprestatairesinscripnotifs()
      .subscribe((data) => {this.prestatairedemandesnotifs = data, console.log(data) } , error => console.log(error));

    this.adminservice.getnbrdemandesinscriptionsnotifs()
    .subscribe((data) => {this.nbrdemandesinscripsnotifs = data, console.log(data)} , error => console.log(error));

      this.listTitles = ROUTES.filter(listTitle => listTitle);
      console.log(this.listTitles[0].path);
      console.log( this.location.prepareExternalUrl(this.location.path()));

      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());


      for(var item = 0; item < this.listTitles.length; item++){
          if("/dash" + this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }

    logout(): void {
      this.tokenStorageService.signOut();
      window.location.href = '/All4MyCar/home';  }

      demandesnotificationssupprimes(){
        this.adminservice.setdemandesinsriptsnotifications()
        .subscribe((data) => {this.nbrdemandesinscripsnotifs = data, console.log(data)} , error => console.log(error));

      // this.ngOnInit();
      }

}
interface City {
  name: string;
  code: string;
}
