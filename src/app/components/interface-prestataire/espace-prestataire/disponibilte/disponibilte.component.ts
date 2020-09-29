import { Time } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { config } from 'process';
import { Disponibilte } from 'src/app/entities/disponibilte';
import { PrestataireService } from 'src/app/_services/prestataire.service';

@Component({
  selector: 'app-disponibilte',
  templateUrl: './disponibilte.component.html',
  styleUrls: ['./disponibilte.component.css']
})
export class DisponibilteComponent implements OnInit {

  formErrors = {
    

};

validationMessages = {
  
};


  form: FormGroup;
  isSuccessful = false;
  errorMessage = '';
  showdisponibilteForm = true;
  showhide : boolean ;
  showhidepregnant: boolean;
  isShown11: boolean = false ; isShown12: boolean = false ;isShown21: boolean = false ; isShown22: boolean = false ;isShown31: boolean = false ; isShown32: boolean = false ;
  isShown41: boolean = false ; isShown42: boolean = false ;isShown51: boolean = false ; isShown52: boolean = false ;  
  isShown61: boolean = false ; isShown62: boolean = false ;isShown71: boolean = false ; isShown72: boolean = false ;
  dispos: Disponibilte[];
 dispo : Disponibilte;
 dispocopy : Disponibilte;
 jourw : String;
 Tel : Time;
 datea : Date;
 formattedDate: Date;
 click:boolean;
 defaultDate: Date = new Date("January 31 1980 12:30");
  constructor(private fb: FormBuilder, private prestataireservice: PrestataireService) { }

  ngOnInit(): void {
    
    this.createformprofil() ;
    this.prestataireservice.getDisponibilte()
   .subscribe((data) => {this.dispos = data,console.log(typeof(data));
   for(let i=0;i<this.dispos.length;i++){
     if (this.dispos[i].heuredam!=null){this.formattedDate=new Date(this.dispos[i].heuredam);this.form.controls[ 'heuredam'+i ].setValue(this.formattedDate);}
     if (this.dispos[i].heuredm!=null){this.formattedDate=new Date(this.dispos[i].heuredm);this.form.controls[ 'heuredm'+i ].setValue(this.formattedDate);}
     if (this.dispos[i].heurefm!=null){this.formattedDate=new Date(this.dispos[i].heurefm);this.form.controls[ 'heurefm'+i ].setValue(this.formattedDate);}
     if (this.dispos[i].heurefam!=null){this.formattedDate=new Date(this.dispos[i].heurefam);this.form.controls[ 'heurefam'+i ].setValue(this.formattedDate);}
   }
   if (this.dispos[0].jour_actif!=false) this.isShown11=true; if (this.dispos[0].heuredam!=null && this.dispos[0].jour_actif!=false) this.isShown12=true;
   if (this.dispos[1].jour_actif!=false) this.isShown21=true; if (this.dispos[1].heuredam!=null && this.dispos[1].jour_actif!=false) this.isShown22=true;
   if (this.dispos[2].jour_actif!=false) this.isShown31=true; if (this.dispos[2].heuredam!=null && this.dispos[2].jour_actif!=false) this.isShown32=true;
   if (this.dispos[3].jour_actif!=false) this.isShown41=true; if (this.dispos[3].heuredam!=null && this.dispos[3].jour_actif!=false) this.isShown42=true;
   if (this.dispos[4].jour_actif!=false) this.isShown51=true; if (this.dispos[4].heuredam!=null && this.dispos[4].jour_actif!=false) this.isShown52=true;
   if (this.dispos[5].jour_actif!=false) this.isShown61=true; if (this.dispos[5].heuredam!=null && this.dispos[5].jour_actif!=false) this.isShown62=true;
   if (this.dispos[6].jour_actif!=false) this.isShown71=true; if (this.dispos[6].heuredam!=null && this.dispos[6].jour_actif!=false) this.isShown72=true;

   } , error => console.log(error));


  }
  

  createformprofil(): void{
    this.form = this.fb.group({
     heuredam0: ['' ],heuredm0: ['' ],heurefam0: ['' ],heurefm0: ['' ],
     heuredam1: ['' ],heuredm1: ['' ],heurefam1: ['' ],heurefm1: ['' ],
     heuredam2: ['' ],heuredm2: ['' ],heurefam2: ['' ],heurefm2: ['' ],
     heuredam3: ['' ],heuredm3: ['' ],heurefam3: ['' ],heurefm3: ['' ],
     heuredam4: ['' ],heuredm4: ['' ],heurefam4: ['' ],heurefm4: ['' ],
     heuredam5: ['' ],heuredm5: ['' ],heurefam5: ['' ],heurefm5: ['' ],
     heuredam6: ['' ],heuredm6: ['' ],heurefam6: ['' ],heurefm6: ['' ],
     
jour: ['' ],
jour_actif : ['']
    
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
    

        clicked(){
          this.click=true;
        }

  toggleShow(i : number) {
    if ( i==11){
      if (this.click==true){
      console.log(this.isShown11,this.isShown12);
      this.isShown11 = ! this.isShown11;this.click=false;
    if ( this.isShown11==false){if (this.isShown12=true){this.click=true;this.toggleShow(12);}}
    console.log(this.isShown11,this.isShown12);
      }
}
  
    if ( i==12){
      if (this.click=true){
      this.isShown12 = ! this.isShown12;
      this.click=false; }
      }
      if ( i==21){
        if (this.click==true){
          console.log(this.isShown21,this.isShown22);
          this.isShown21 = ! this.isShown21;this.click=false;
        if ( this.isShown21==false){if (this.isShown22=true){this.click=true;this.toggleShow(22);}}
        console.log(this.isShown21,this.isShown22);
          }

        }
        if ( i==22){
          if (this.click=true){
            this.isShown22 = ! this.isShown22;
            this.click=false; } }
            
        if ( i==31){
          if (this.click==true){
            console.log(this.isShown31,this.isShown32);
            this.isShown31 = ! this.isShown31;this.click=false;
          if ( this.isShown31==false){if (this.isShown32=true){this.click=true;this.toggleShow(32);}}
          console.log(this.isShown31,this.isShown32);
            }

            }
            if ( i==32){
              if (this.click=true){
                this.isShown32 = ! this.isShown32;
                this.click=false; }  }
                
                if ( i==41){
                if (this.click==true){
                  console.log(this.isShown41,this.isShown42);
                  this.isShown41 = ! this.isShown41;this.click=false;
                if ( this.isShown41==false){if (this.isShown42=true){this.click=true;this.toggleShow(42);}}
                console.log(this.isShown41,this.isShown42);
                  }
                }
                if ( i==42){
                  if (this.click=true){
                    this.isShown42 = ! this.isShown42;
                    this.click=false; }}
                    if ( i==51){
                    if (this.click==true){
                      console.log(this.isShown51,this.isShown52);
                      this.isShown51 = ! this.isShown51;this.click=false;
                    if ( this.isShown51==false){if (this.isShown52=true){this.click=true;this.toggleShow(52);}}
                    console.log(this.isShown51,this.isShown52);
                      }

                    }
                    if ( i==52){
                      if (this.click=true){
                        this.isShown52 = ! this.isShown52;
                        this.click=false; }
                                            }if ( i==61){
                        if (this.click==true){
                          console.log(this.isShown61,this.isShown62);
                          this.isShown61 = ! this.isShown61;this.click=false;
                        if ( this.isShown61==false){if (this.isShown62=true){this.click=true;this.toggleShow(62);}}
                        console.log(this.isShown61,this.isShown62);
                          }

                        }
                        if ( i==62){
                          if (this.click=true){
                            this.isShown62 = ! this.isShown62;
                            this.click=false; }
                                                    }if ( i==71){
                            if (this.click==true){
                              console.log(this.isShown71,this.isShown72);
                              this.isShown71 = ! this.isShown71;this.click=false;
                            if ( this.isShown71==false){if (this.isShown72=true){this.click=true;this.toggleShow(72);}}
                            console.log(this.isShown71,this.isShown72);
                              }

                            }
                            if ( i==72){
                              if (this.click=true){
                                this.isShown72 = ! this.isShown72;
                                this.click=false; }             
                                               }
    
    
    }

    onsubmittt(){
 //   this.isSuccessful = true;
     
 this.dispo = this.form.value;
 const ss : Disponibilte = (this.form.value.heuredm0,this.form.value.heurefm0,this.form.value.heuredam0,
  this.form.value.heurefam0);
  console.log(ss)
 console.log(typeof(this.form.value.heuredam)+" "+this.form.value.heuredam);
 var registerModel: Disponibilte={
  id : null,heuredam: null,heuredm: null,heurefam :null,heurefm :null,jour :null,jour_actif : true,periodedeux_actif:true};
  for(let num=0;num<7;num++){
    if (num==0){
 registerModel={
   id : null,heuredam: this.form.value.heuredam0,heuredm: this.form.value.heuredm0,
  heurefam :this.form.value.heurefam0,heurefm :this.form.value.heurefm0,jour :'LUNDI',jour_actif : this.isShown11,periodedeux_actif:this.isShown12,
};
this.prestataireservice.modif_dispo(registerModel)
  .subscribe(client => {
    this.dispocopy = client ;
    this.dispo = null ;
    setTimeout(() => {
      this.dispocopy = null; this.showdisponibilteForm = true; }, 5000);     },
      error => console.log(error.status, error.message));
    }
if (num==1){
  registerModel={
    id : null,heuredam: this.form.value.heuredam1,heuredm: this.form.value.heuredm1,
   heurefam :this.form.value.heurefam1,heurefm :this.form.value.heurefm1,jour :'MARDI',jour_actif : this.isShown21,periodedeux_actif:this.isShown22,
 };
 this.prestataireservice.modif_dispo(registerModel)
 .subscribe(client => {
   this.dispocopy = client ;
   this.dispo = null ;
   setTimeout(() => {
     this.dispocopy = null; this.showdisponibilteForm = true; }, 5000);     },
     error => console.log(error.status, error.message));}
 if (num==2){
  registerModel={
    id : null,heuredam: this.form.value.heuredam2,heuredm: this.form.value.heuredm2,
   heurefam :this.form.value.heurefam2,heurefm :this.form.value.heurefm2,jour :'MERCREDI',jour_actif : this.isShown31,periodedeux_actif:this.isShown32,
 };
 this.prestataireservice.modif_dispo(registerModel)
 .subscribe(client => {
   this.dispocopy = client ;
   this.dispo = null ;
   setTimeout(() => {
     this.dispocopy = null; this.showdisponibilteForm = true; }, 5000);     },
     error => console.log(error.status, error.message));
}
 if (num==3){
  registerModel={
    id : null,heuredam: this.form.value.heuredam3,heuredm: this.form.value.heuredm3,
   heurefam :this.form.value.heurefam3,heurefm :this.form.value.heurefm3,jour :'JEUDI',jour_actif : this.isShown41,periodedeux_actif:this.isShown42,
 };
 this.prestataireservice.modif_dispo(registerModel)
 .subscribe(client => {
   this.dispocopy = client ;
   this.dispo = null ;
   setTimeout(() => {
     this.dispocopy = null; this.showdisponibilteForm = true; }, 5000);     },
     error => console.log(error.status, error.message));}
 if (num==4){
  registerModel={
    id : null,heuredam: this.form.value.heuredam4,heuredm: this.form.value.heuredm4,
   heurefam :this.form.value.heurefam4,heurefm :this.form.value.heurefm4,jour :'VENDREDI',jour_actif : this.isShown51,periodedeux_actif:this.isShown52,
 };
 this.prestataireservice.modif_dispo(registerModel)
 .subscribe(client => {
   this.dispocopy = client ;
   this.dispo = null ;
   setTimeout(() => {
     this.dispocopy = null; this.showdisponibilteForm = true; }, 5000);     },
     error => console.log(error.status, error.message));}
 if (num==5){
  registerModel={
    id : null,heuredam: this.form.value.heuredam5,heuredm: this.form.value.heuredm5,
   heurefam :this.form.value.heurefam5,heurefm :this.form.value.heurefm5,jour :'SAMEDI',jour_actif : this.isShown61,periodedeux_actif:this.isShown62,
 };
 this.prestataireservice.modif_dispo(registerModel)
 .subscribe(client => {
   this.dispocopy = client ;
   this.dispo = null ;
   setTimeout(() => {
     this.dispocopy = null; this.showdisponibilteForm = true; }, 5000);     },
     error => console.log(error.status, error.message));}
 if (num==6){
  registerModel={
    id : null,heuredam: this.form.value.heuredam6,heuredm: this.form.value.heuredm6,
   heurefam :this.form.value.heurefam6,heurefm :this.form.value.heurefm6,jour :'DIMANCHE',jour_actif : this.isShown71,periodedeux_actif:this.isShown72,
 };
 this.prestataireservice.modif_dispo(registerModel)
 .subscribe(client => {
   this.dispocopy = client ;
   this.dispo = null ;
   setTimeout(() => {
     this.dispocopy = null; this.showdisponibilteForm = true; }, 5000);     },
     error => console.log(error.status, error.message));}
console.log(registerModel);
 
//  console.log(this.prestataire);


    }
}

}
