import {Intervenant} from "../Intervenant";

export class OrdreTravail{
  id!:number;
  type!:string;
  etat!:boolean;
  cloturage!:number;
  dateLancement!:Date;
  dateTermination!:Date;
  description!:string;
  intervenantsAffectes!:Intervenant[];


}
