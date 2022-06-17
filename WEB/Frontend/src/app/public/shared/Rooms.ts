import {Panne} from "../models/Panne";

export interface Rooms {
  id:number;
  numero:number;
  etat:boolean
  typePannes:Panne[]
  createdAt:Date
  updatedAt:Date
}
