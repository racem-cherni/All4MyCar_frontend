import { Client } from './client';
import { Prestataire } from './prestataire';

export class User {





   id: number;
   username: string;
   email: string;
   etat: boolean;
   date_registration: Date;
   client: Client;
   prestataire:Prestataire;

}
