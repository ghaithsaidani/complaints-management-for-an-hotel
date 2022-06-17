import {Intervenant} from "../models/Intervenant";
import {LigneOtPanne} from "../models/ot/lignes/LigneOtPanne";
import {LigneOtEquipement} from "../models/ot/lignes/LigneOtEquipement";

export interface OrdresTravail{
  id:number;
  dateLancement:Date;
  dateTermination:Date;
  description:string;
  intervenantsAffectes:Intervenant[];
}

export interface OtReclamationPannes extends OrdresTravail{
  reclamationsPannes:LigneOtPanne[];
}

export interface OtReclamationEquipements extends OrdresTravail{
  reclamationsEquipement:LigneOtEquipement[]
}
