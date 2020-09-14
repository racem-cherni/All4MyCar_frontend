import { VehiculeMarque } from './vehicule-marque';
import { VehiculeModel } from './vehicule-model';

export class Vehicule {

    id : number;
    marque : VehiculeMarque ;
    model : VehiculeModel;
    annee_de_sortie : Date;
    date_assurance : Date ;
    immatriculation : String
	galerie_photo : String;
	assureur : String;
	num_contrat_assurance : String;
}
