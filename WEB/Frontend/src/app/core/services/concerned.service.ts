import { Injectable } from '@angular/core';
import {User} from "../../public/models/User";
import {Equipement} from "../../public/models/Equipement";
import {Local} from "../../public/models/Local";
import {Room} from "../../public/models/Room";
import {Panne} from "../../public/models/Panne";
import {Reclamation} from "../../public/models/reclamations/Reclamation";
import {Pieces} from "../../public/models/Pieces";
import {Intervenant} from "../../public/models/Intervenant";
import {OrdreTravail} from "../../public/models/ot/OrdreTravail";
import {Intervention} from "../../public/models/intervention/Intervention";
import {Preventif} from "../../public/models/Preventif";

@Injectable({
  providedIn: 'root'
})
export class ConcernedService {


  private user!: User;
  private equipement!: Equipement;
  private local!: Local;
  private room!:Room;
  private panne!:Panne;
  private reclamation!:any;
  private ot!:any;
  private intervenant!:Intervenant;
  private piece!:Pieces;
  private intervention!:any;
  private dialogId!:string;
  private preventif!:Preventif;



  getpreventif(): any {
    return this.preventif;
  }

  setpreventif(value: any) {
    this.preventif = value;
  }


  getintervention(): any {
    return this.intervention;
  }

  setintervention(value: any) {
    this.intervention = value;
  }

  getpiece(): Pieces {
    return this.piece;
  }

  setpiece(value: Pieces) {
    this.piece = value;
  }

  getDialogId(): string {
    return this.dialogId;
  }

  setDialogId(value: string) {
    this.dialogId = value;
  }

  constructor() { }



  public getuser(): User {
    return this.user;
  }
  public setuser(value: any) {
    this.user = value;
  }

  public getequipement(): Equipement {
    return this.equipement;
  }
  public setequipement(value: Equipement) {
    this.equipement = value;
  }


  public getroom(): Room {
    return this.room;
  }

  public setroom(value: any) {
    this.room = value;
  }


  public getlocal(): Local {
    return this.local;
  }
  public setlocal(value: any) {
    this.local = value;
  }


  public getPanne(): Panne {
    return this.panne;
  }
  public setPanne(value: any) {
    this.panne = value;
  }

  public getReclamation(): any {
    return this.reclamation;
  }
  public setReclamation(value: any) {
    this.reclamation = value;
  }

  public getintervenant(): Intervenant {
    return this.intervenant;
  }

  public setintervenant(value: Intervenant) {
    this.intervenant = value;
  }


  public getot(): any {
    return this.ot;
  }

  public setot(value: any) {
    this.ot = value;
  }
}
