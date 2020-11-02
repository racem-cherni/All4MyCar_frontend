import { Specialisation } from './specialisation';
import { Vehicule } from './vehicule';

export class EntretienCarnet {

    id : number ;
    date_entretien: Date;
    centre_entretien: String;
    prix_entretien: number;
    note_entretien: String;
    odometer_entretien : number;
    specialisations: String;
    vehicule : Vehicule;

}
