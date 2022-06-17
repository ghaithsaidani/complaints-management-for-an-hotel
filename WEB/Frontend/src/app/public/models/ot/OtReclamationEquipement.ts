import {OrdreTravail} from "./OrdreTravail";
import {LigneOtEquipement} from "./lignes/LigneOtEquipement";

export class OtReclamationEquipement extends OrdreTravail{
  reclamationsEquipement!:LigneOtEquipement[];
}
