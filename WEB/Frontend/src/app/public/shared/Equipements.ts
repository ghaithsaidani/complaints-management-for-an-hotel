import {Local} from "../models/Local";

export interface Equipements {
  id:number;
  description:string;
  designation:string;
  numSerie:number;
  famille:string;
  date_achat:Date;
  date_exploit:Date;
  periodicite_maintenance:number;
  etat:boolean
  etat_equipement:number
  local:Local
  createdAt:Date
  updatedAt:Date
}
