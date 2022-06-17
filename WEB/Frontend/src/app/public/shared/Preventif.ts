import {Equipement} from "../models/Equipement";


export interface Preventif {
  id:number;
  datePrevue: Date;
  avancement: number;
  equipement:Equipement

}
