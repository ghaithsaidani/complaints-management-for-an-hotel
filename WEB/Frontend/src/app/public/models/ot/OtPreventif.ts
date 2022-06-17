import {OrdreTravail} from "./OrdreTravail";
import {LigneOtPreventif} from "./lignes/LigneOtPreventif";

export class OtPreventif extends OrdreTravail{
  preventifR!:LigneOtPreventif[];
}
