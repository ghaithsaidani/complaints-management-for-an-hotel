import { Injectable } from '@angular/core';
import {AccessService} from "./access.service";
import {MyserviceService} from "./myservice.service";

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor(private access:AccessService,private myservice:MyserviceService) {
    this.access.ngOnInit()
  }


  NavbarData=[
    {
      routerLink:'/dashboard/home',
      Label:"Dashboard",
      Icon:'dashboard',
      access: this.access.dashboard_access,

    },
    {
      routerLink:'/dashboard/accounts',
      Label:"Comptes",
      Icon:'manage_accounts',
      access:this.access.accounts_access

    },
    {
      routerLink:'/dashboard/reclamations',
      Label:"Réclamations",
      Icon:'security_update_warning',
      access:this.access.reclamation_access
    },
    {
      routerLink:'/dashboard/preventif',
      Label:'Préventives Systéme',
      Icon:'event',
      access:this.access.preventif_access
    },


    {
      routerLink:'/dashboard/ot',
      Label:"Ordres de Travail",
      Icon:'receipt_long',
      access:this.access.ot_access
    },
    {
      routerLink:'/dashboard/interventions',
      Label:"Interventions",
      Icon:'assignment_turned_in',
      access:this.access.intervention_access
    },
    {
      routerLink:'/dashboard/intervenants',
      Label:"Intervenants",
      Icon:'engineering',
      access:this.access.intervenant_access

    },

    {
      routerLink:'/dashboard/d-base/locaux',
      Label:"Locaux",
      Icon:'museum',
      access:this.access.locals_access

    },
    {
      routerLink:'/dashboard/d-base/chambres',
      Label:"Chambres",
      Icon:'bedroom_parent',
      access:this.access.chambres_access

    },
    {
      routerLink:'/dashboard/d-base/equipements',
      Label:"Equipements",
      Icon:'table_restaurant',
      access:this.access.equipement_access

    },
    {
      routerLink:'/dashboard/d-base/pannes',
      Label:"Types de Pannes",
      Icon:'report',
      access:this.access.panne_access
    },
    {
      routerLink:'/dashboard/d-base/pieces',
      Label:"Piéces de Rechange",
      Icon:'handyman',
      access:this.access.pieces_access

    },
    {
      routerLink:'/dashboard/reporting',
      Label:"Reporting",
      Icon:'analytics',
      access:this.access.reporting_access
    },
  ]
  ngOnInit(){
  }
}
