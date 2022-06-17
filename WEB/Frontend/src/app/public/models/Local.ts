import {Equipement} from "./Equipement";

export class Local{
  id!:number;
  description!:string;
  parent!:string;
  etat!:boolean
  equipements!:Equipement[]
  createdAt!:Date
  updatedAt!:Date
}
