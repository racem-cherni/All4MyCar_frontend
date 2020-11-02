import { Vehicule } from './vehicule';

export class TrajetCarnet {
    id : number;
    heure_depart: Date;
    date_depart : Date;
    lieux_depart : String;

    heure_arrive: Date;
    date_arrive : Date;
    lieux_arrive: String;
    
    taxe_trajet: number;
    note_trajet: String;
    distance_trajet: number;
    duree_trajet: number;
    vitesse_trajet: number;

    
    vehicule : Vehicule;

}
