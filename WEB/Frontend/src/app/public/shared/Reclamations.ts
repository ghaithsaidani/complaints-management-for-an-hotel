import {Equipement} from "../models/Equipement";
import {Panne} from "../models/Panne";
import {Room} from "../models/Room";

export interface Reclamations{
  id:number;
  type:string;
  priorite:number;
  description:string;
  etat:boolean;
  avancement:number;
  nom_reclameur:string;
  createdAt:Date
  updatedAt:Date
}

export interface ReclamationsEquipement extends Reclamations{
  equipement:Equipement
}


export interface ReclamationsPanne extends Reclamations{
  typePanne:Panne
  chambre:Room

}
