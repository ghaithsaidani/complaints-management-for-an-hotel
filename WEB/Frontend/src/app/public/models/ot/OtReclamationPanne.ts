import {OrdreTravail} from "./OrdreTravail";
import {LigneOtPanne} from "./lignes/LigneOtPanne";

export class OtReclamationPanne extends OrdreTravail{
  reclamationsPannes!:LigneOtPanne[];


}
