import { Adressecities } from './adressecities';

export class Garage {

    id:number;
    nom:string;
    Nbr_Mecaniciens: number;
    date_ouverture:Date;
    année_Experience:number;
    photo_garage:string =null;
   adressecite:Adressecities;
    addresse:string;
    description:string;
    etat : number;

}
