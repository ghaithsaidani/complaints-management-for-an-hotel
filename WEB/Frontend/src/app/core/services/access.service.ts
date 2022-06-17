import {Injectable, OnInit} from '@angular/core';
import {Access} from "../../public/models/Access";
import {TokenstorageService} from "./tokenstorage.service";

@Injectable({
  providedIn: 'root'
})
export class AccessService implements OnInit{
  get local(): Access {
    return this._local;
  }

  set local(value: Access) {
    this._local = value;
  }

  get chambre(): Access {
    return this._chambre;
  }

  set chambre(value: Access) {
    this._chambre = value;
  }




  get account(): Access {
    return this._account;
  }


  set account(value: Access) {
    this._account = value;
  }


  get equipement(): Access {
    return this._equipement;
  }

  set equipement(value: Access) {
    this._equipement = value;
  }

  get panne(): Access {
    return this._panne;
  }

  set panne(value: Access) {
    this._panne = value;
  }


  get reclamations(): Access {
    return this._reclamations;
  }

  set reclamations(value: Access) {
    this._reclamations = value;
  }

  get ot(): Access {
    return this._ot;
  }

  set ot(value: Access) {
    this._ot = value;
  }

  get intervention(): Access {
    return this._intervention;
  }

  set intervention(value: Access) {
    this._intervention = value;
  }

  get intervenant(): Access {
    return this._intervenant;
  }

  set intervenant(value: Access) {
    this._intervenant = value;
  }

  get reporting(): Access {
    return this._reporting;
  }

  set reporting(value: Access) {
    this._reporting = value;
  }

  get pieces(): Access {
    return this._pieces;
  }

  set pieces(value: Access) {
    this._pieces = value;
  }

  private _account!:Access
  private _local!:Access
  private _chambre!:Access
  private _equipement!:Access
  private _panne!:Access
  private _reclamations!:Access
  private _ot!:Access
  private _intervention!:Access
  private _intervenant!:Access
  private _reporting!:Access
  private _pieces!:Access
  private _Preventif!:Access
  private _Dashboard!:Access

  private _accounts_access!:boolean

  private _locals_access!:boolean

  private _chambres_access!:boolean

  private _equipement_access!:boolean

  private _panne_access!:boolean

  private _reclamation_access!:boolean

  private _ot_access!:boolean

  private _intervention_access!:boolean

  private _intervenant_access!:boolean

  private _reporting_access!:boolean

  private _pieces_access!:boolean
  private _preventif_access!:boolean
  private _dashboard_access!:boolean


  get Dashboard(): Access {
    return this._Dashboard;
  }

  set Dashboard(value: Access) {
    this._Dashboard = value;
  }

  get dashboard_access(): boolean {
    return this._dashboard_access;
  }

  set dashboard_access(value: boolean) {
    this._dashboard_access = value;
  }

  get accounts_access(): boolean {
    return this._accounts_access;
  }

  set accounts_access(value: boolean) {
    this._accounts_access = value;
  }


  get Preventif(): Access {
    return this._Preventif;
  }

  set Preventif(value: Access) {
    this._Preventif = value;
  }

  get preventif_access(): boolean {
    return this._preventif_access;
  }

  set preventif_access(value: boolean) {
    this._preventif_access = value;
  }

  get locals_access(): boolean {
    return this._locals_access;
  }

  set locals_access(value: boolean) {
    this._locals_access = value;
  }

  get chambres_access(): boolean {
    return this._chambres_access;
  }

  set chambres_access(value: boolean) {
    this._chambres_access = value;
  }


  get equipement_access(): boolean {
    return this._equipement_access;
  }

  set equipement_access(value: boolean) {
    this._equipement_access = value;
  }

  get panne_access(): boolean {
    return this._panne_access;
  }

  set panne_access(value: boolean) {
    this._panne_access = value;
  }


  get reclamation_access(): boolean {
    return this._reclamation_access;
  }

  set reclamation_access(value: boolean) {
    this._reclamation_access = value;
  }

  get ot_access(): boolean {
    return this._ot_access;
  }

  set ot_access(value: boolean) {
    this._ot_access = value;
  }

  get intervention_access(): boolean {
    return this._intervention_access;
  }

  set intervention_access(value: boolean) {
    this._intervention_access = value;
  }

  get intervenant_access(): boolean {
    return this._intervenant_access;
  }

  set intervenant_access(value: boolean) {
    this._intervenant_access = value;
  }

  get reporting_access(): boolean {
    return this._reporting_access;
  }

  set reporting_access(value: boolean) {
    this._reporting_access = value;
  }

  get pieces_access(): boolean {
    return this._pieces_access;
  }

  set pieces_access(value: boolean) {
    this._pieces_access = value;
  }


  giveAdminAccess(){

      this.account=new Access(true,true,true,true)
      this.accounts_access=true
      this.local=new Access(true,true,true,true)
      this.locals_access=true
      this.chambre=new Access(true,true,true,true)
      this.chambres_access=true
      this.equipement=new Access(true,true,true,true)
      this.equipement_access=true
      this.panne=new Access(true,true,true,true)
      this.panne_access=true
      this.reclamations=new Access(true,true,true,true)
      this.reclamation_access=true
      this.ot=new Access(true,true,true,true)
      this.ot_access=true
      this.intervenant=new Access(true,true,true,true)
      this.intervenant_access=true
      this.intervention=new Access(true,true,true,true)
      this.intervention_access=true
      this.pieces=new Access(true,true,true,true)
      this.pieces_access=true
      this.Preventif=new Access(true,true,true,true)
      this.preventif_access=true
      this.reporting=new Access(true,true,true,true)
      this.reporting_access=true
      this.Dashboard=new Access(true,true,true,true)
      this.dashboard_access=true
  }

  giveUserAccess(){
    this.account=new Access(false,false,false,false)
    this.accounts_access=false
    this.local=new Access(true,false,false,false)
    this.locals_access=true
    this.chambre=new Access(true,false,false,false)
    this.chambres_access=true
    this.equipement=new Access(true,true,true,false)
    this.equipement_access=true
    this.panne=new Access(true,true,true,true)
    this.panne_access=true
    this.reclamations=new Access(true,true,true,true)
    this.reclamation_access=true
    this.ot=new Access(true,true,true,true)
    this.ot_access=true
    this.intervenant=new Access(true,true,true,true)
    this.intervenant_access=true
    this.intervention=new Access(true,true,true,true)
    this.intervention_access=true
    this.Preventif=new Access(true,true,true,true)
    this.preventif_access=true
    this.pieces=new Access(true,true,true,true)
    this.pieces_access=true
    this.reporting=new Access(false,false,false,false)
    this.reporting_access=false
    this.Dashboard=new Access(true,true,true,true)
    this.dashboard_access=true
  }

  giveGouvernanteAccess(){
    this.account=new Access(false,false,false,false)
    this.accounts_access=false
    this.local=new Access(false,false,false,false)
    this.locals_access=false
    this.chambre=new Access(false,false,false,false)
    this.chambres_access=false
    this.equipement=new Access(false,false,false,false)
    this.equipement_access=false
    this.panne=new Access(false,false,false,false)
    this.panne_access=false
    this.reclamations=new Access(true,true,true,true)
    this.reclamation_access=true
    this.ot=new Access(true,true,true,true)
    this.ot_access=false
    this.intervenant=new Access(true,true,true,true)
    this.intervenant_access=false
    this.intervention=new Access(true,true,true,true)
    this.intervention_access=false
    this.Preventif=new Access(false,false,false,false)
    this.preventif_access=false
    this.pieces=new Access(true,true,true,true)
    this.pieces_access=false
    this.reporting=new Access(false,false,false,false)
    this.reporting_access=false
    this.Dashboard=new Access(false,false,false,false)
    this.dashboard_access=false
  }





  deleteAllaccess(){
    this.account=new Access(false,false,false,false)
    this.accounts_access=false
    this.local=new Access(false,false,false,false)
    this.locals_access=false
    this.chambre=new Access(false,false,false,false)
    this.chambres_access=false
    this.equipement=new Access(false,false,false,false)
    this.equipement_access=false
    this.panne=new Access(false,false,false,false)
    this.panne_access=false
    this.reclamations=new Access(false,false,false,false)
    this.reclamation_access=false
    this.ot=new Access(false,false,false,false)
    this.ot_access=false
    this.intervenant=new Access(false,false,false,false)
    this.intervenant_access=false
    this.intervention=new Access(false,false,false,false)
    this.intervention_access=false
    this.pieces=new Access(false,false,false,false)
    this.pieces_access=false
    this.reporting=new Access(false,false,false,false)
    this.reporting_access=false

  }

  giveAccess(){
    switch (this.tokenService.getUser().roles[0].name) {
      case "ADMINISTRATEUR":
        this.giveAdminAccess()
        break;
      case "UTILISATEUR":
        this.giveUserAccess()
        break
      case "GOUVERNANTE":
        this.giveGouvernanteAccess()
        break
      default:
        break;
    }
    /*console.log(this.acess.accounts_access)
    console.log(this.acess.equipement_access)
    console.log(this.acess.locals_access)
    console.log(this.acess.panne_access)*/

  }


  constructor(private tokenService:TokenstorageService) {
  }

  ngOnInit(): void {
    this.giveAccess()
  }
}
