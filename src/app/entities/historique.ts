import { Vehicule } from './vehicule';
import {CarburantCarnet} from './carburant-carnet';
import {EntretienCarnet} from './entretien-carnet';
import{TrajetCarnet} from './trajet-carnet';
import {DepenseCarnet} from'./depense-carnet';
import{OdometerCarnet} from './odometer-carnet';

export class Historique {
    id : number;
    

    
    vehicule : Vehicule;
    carburant : CarburantCarnet=null;
    entretien:EntretienCarnet=null;
    trajet:TrajetCarnet;
    depense:DepenseCarnet;
    odometer:OdometerCarnet;

}
