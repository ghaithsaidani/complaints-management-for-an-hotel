import * as Moment from 'moment'
import 'moment-duration-format';
import {ReclamationEquipement} from "../../reclamations/ReclamationEquipement";
export class LigneOtEquipement{
  id!:number;
  reclamation!:ReclamationEquipement;
  tempsEstime!:Moment.Duration;


}
