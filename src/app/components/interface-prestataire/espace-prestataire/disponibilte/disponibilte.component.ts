import { Time } from '@angular/common';
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
   if (this.dispos[0].jour_actif!=false) this.isShown11=true; if (this.dispos[0].heuredam!=null) this.isShown12=true;
   if (this.dispos[1].jour_actif!=false) this.isShown21=true; if (this.dispos[1].heuredam!=null) this.isShown22=true;
   if (this.dispos[2].jour_actif!=false) this.isShown31=true; if (this.dispos[2].heuredam!=null) this.isShown32=true;
   if (this.dispos[3].jour_actif!=false) this.isShown41=true; if (this.dispos[3].heuredam!=null) this.isShown42=true;
   if (this.dispos[4].jour_actif!=false) this.isShown51=true; if (this.dispos[4].heuredam!=null) this.isShown52=true;
   if (this.dispos[5].jour_actif!=false) this.isShown61=true; if (this.dispos[5].heuredam!=null) this.isShown62=true;
   if (this.dispos[6].jour_actif!=false) this.isShown71=true; if (this.dispos[6].heuredam!=null) this.isShown72=true;

   } , error => console.log(error));


  }
  
 

  onSubmit(): void {

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

      onsubmitt(valeur : string,num:Number) {
     //   this.isSuccessful = true;
     this.form.value.jour = valeur ;
     
       this.dispo = this.form.value;
       const ss : Disponibilte = (this.form.value.heuredm0,this.form.value.heurefm0,this.form.value.heuredam0,
        this.form.value.heurefam0);
        console.log(ss)
       console.log(typeof(this.form.value.heuredam)+" "+this.form.value.heuredam);
       var registerModel: Disponibilte={
        id : null,heuredam: null,heuredm: null,heurefam :null,heurefm :null,jour :null,jour_actif : true,};
       if (num==0){
       registerModel={
         id : null,heuredam: this.form.value.heuredam0,heuredm: this.form.value.heuredm0,
        heurefam :this.form.value.heurefam0,heurefm :this.form.value.heurefm0,jour :this.form.value.jour,jour_actif : true,
      };}
      if (num==1){
        registerModel={
          id : null,heuredam: this.form.value.heuredam1,heuredm: this.form.value.heuredm1,
         heurefam :this.form.value.heurefam1,heurefm :this.form.value.heurefm1,jour :this.form.value.jour,jour_actif : true,
       };}
       if (num==2){
        registerModel={
          id : null,heuredam: this.form.value.heuredam2,heuredm: this.form.value.heuredm2,
         heurefam :this.form.value.heurefam2,heurefm :this.form.value.heurefm2,jour :this.form.value.jour,jour_actif : true,
       };}
       if (num==3){
        registerModel={
          id : null,heuredam: this.form.value.heuredam3,heuredm: this.form.value.heuredm3,
         heurefam :this.form.value.heurefam3,heurefm :this.form.value.heurefm3,jour :this.form.value.jour,jour_actif : true,
       };}
       if (num==4){
        registerModel={
          id : null,heuredam: this.form.value.heuredam4,heuredm: this.form.value.heuredm4,
         heurefam :this.form.value.heurefam4,heurefm :this.form.value.heurefm4,jour :this.form.value.jour,jour_actif : true,
       };}
       if (num==5){
        registerModel={
          id : null,heuredam: this.form.value.heuredam5,heuredm: this.form.value.heuredm5,
         heurefam :this.form.value.heurefam5,heurefm :this.form.value.heurefm5,jour :this.form.value.jour,jour_actif : true,
       };}
       if (num==6){
        registerModel={
          id : null,heuredam: this.form.value.heuredam6,heuredm: this.form.value.heuredm6,
         heurefam :this.form.value.heurefam6,heurefm :this.form.value.heurefm6,jour :this.form.value.jour,jour_actif : true,
       };}
      console.log(registerModel);
       
      //  console.log(this.prestataire);
      this.prestataireservice.modif_dispo(registerModel)
        .subscribe(client => {
          this.dispocopy = client ;
          this.dispo = null ;
          setTimeout(() => {
            this.dispocopy = null; this.showdisponibilteForm = true; }, 5000);     },
            error => console.log(error.status, error.message));
            // tslint:disable-next-line: align
            // tslint:disable-next-line: align
          //  this.formFormDirective.reset();
        }
    



  toggleShow(i : number) {
    if ( i==11){
    this.isShown11 = ! this.isShown11;
  
    this.isShown12 = false ;
    }
    if ( i==12){
      this.isShown12 = ! this.isShown12;
      }
      if ( i==21){
        this.isShown21 = ! this.isShown21;
        this.isShown22 = false;

        }
        if ( i==22){
          this.isShown22 = ! this.isShown22;
          }if ( i==31){
            this.isShown31 = ! this.isShown31;
            this.isShown32 = false;

            }
            if ( i==32){
              this.isShown32 = ! this.isShown32;
              }if ( i==41){
                this.isShown41 = ! this.isShown41;
                this.isShown42 = false;

                }
                if ( i==42){
                  this.isShown42 = ! this.isShown42;
                  }if ( i==51){
                    this.isShown51 = ! this.isShown51;
                    this.isShown52 = false;

                    }
                    if ( i==52){
                      this.isShown52 = ! this.isShown52;
                      }if ( i==61){
                        this.isShown61 = ! this.isShown61;
                        this.isShown62 = false;

                        }
                        if ( i==62){
                          this.isShown62 = ! this.isShown62;
                          }if ( i==71){
                            this.isShown71 = ! this.isShown71;
                            this.isShown72 = false;

                            }
                            if ( i==72){
                              this.isShown72 = ! this.isShown72;
                              }
    
    
    }
}
