export class Prestataire {
    id:number;
    firstNamepres: string;
    lastNamepres:string;
    adressepres:string;

    emailpres:string;
    telpres:number;
    photopres: string = '' ;
    specialisations: string;
    cin: number;
    date_inscrip:Date;
    etat : number ;

    notif_etat : boolean;

}
