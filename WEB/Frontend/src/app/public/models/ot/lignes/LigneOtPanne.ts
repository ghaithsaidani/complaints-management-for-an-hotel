import {ReclamationPanne} from "../../reclamations/ReclamationPanne";
import * as Moment from 'moment'
import 'moment-duration-format';
export class LigneOtPanne {
  id!:number;
  reclamation!:ReclamationPanne;
  tempsEstime!:Moment.Duration;
}
