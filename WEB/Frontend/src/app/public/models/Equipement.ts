import {Local} from "./Local";

export class Equipement{
    id!:number;
    designation!:string;
    description!:string;
    numSerie!:number;
    famille!:string;
    dateachat!:Date;
    dateexploi!:Date;
    periodicite_maintenance!:number;
    etat!:boolean
    etat_equipement!:number
    local!:Local
    createdAt!:Date
    updatedAt!:Date


}
