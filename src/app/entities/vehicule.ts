import { VehiculeMarque } from './vehicule-marque';
import { VehiculeModel } from './vehicule-model';

export class Vehicule {

    id : number;
    marque : VehiculeMarque ;
    model : VehiculeModel;
    date_immatriculation : Date;
    date_assurance : Date ;
    immatriculation : string;
    galerie_photo : string;
	assureur : String;
	num_contrat_assurance : string;
    type_vehicule : string ;
    carburant:string;


}
