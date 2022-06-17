import {Reclamation} from "./Reclamation";
import {Panne} from "../Panne";
import {Room} from "../Room";

export class ReclamationPanne extends Reclamation{
  typePanne!:Panne
  chambre!:Room



}
