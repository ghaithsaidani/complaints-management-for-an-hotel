import {OrdreTravail} from "../ot/OrdreTravail";
import {LigneIntervention} from "./LigneIntervention";
import {LigneInterventionReclamation} from "./LigneInterventionReclamation";

export class Intervention {
  id!:number;
  dateCloture!:Date;
  etat!:boolean;
  cloturage!:number;
  ot!:OrdreTravail;
  ligneInterventionsList!:LigneIntervention[];
  description!:string;

}
