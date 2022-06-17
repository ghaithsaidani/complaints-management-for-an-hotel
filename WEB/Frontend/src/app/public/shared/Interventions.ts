import {OrdreTravail} from "../models/ot/OrdreTravail";
import {LigneIntervention} from "../models/intervention/LigneIntervention";

export interface Interventions{
  id:number;
  dateCloture:Date;
  etat:boolean;
  cloturage:number;
  ot:OrdreTravail;
  ligneInterventionsList:LigneIntervention[];
  description:string;
}
