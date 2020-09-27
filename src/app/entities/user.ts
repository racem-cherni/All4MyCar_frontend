import { Client } from './client';
import { Prestataire } from './prestataire';

export class User {





   id: number;
   username: string;
   email: string;
   client: Client;
   prestataire:Prestataire;

}
