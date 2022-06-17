import * as Moment from "moment";
import {Preventif} from "../../Preventif";

export class LigneOtPreventif {
  id!:number;
  preventif!:Preventif;
  tempsEstime!:Moment.Duration;
}
