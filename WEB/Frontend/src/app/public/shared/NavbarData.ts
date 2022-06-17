import {AccessService} from "../../core/services/access.service";


let access=AccessService.prototype
export let NavbarData=[
  {
    routerLink:'/dashboard/home',
    Label:"Acceuil",
    Icon:'home',
    access: true
  },
  {
    routerLink:'/dashboard/accounts',
    Label:"Comptes",
    Icon:'manage_accounts',
    access:access.accounts_access

  },
  {
    routerLink:'/dashboard/reclamations',
    Label:"Réclamations",
    Icon:'security_update_warning',
    access:access.reclamation_access
  },


  {
    routerLink:'/dashboard/ot',
    Label:"Ordres de Travail",
    Icon:'receipt_long',
    access:access.ot_access
  },
  {
    routerLink:'/dashboard/interventions',
    Label:"Interventions",
    Icon:'assignment_turned_in',
    access:access.intervention_access
  },
  {
    routerLink:'/dashboard/intervenants',
    Label:"Intervenants",
    Icon:'engineering',
    access:access.intervenant_access

  },

  {
    routerLink:'/dashboard/d-base/locaux',
    Label:"Locaux",
    Icon:'museum',
    access:access.locals_access

  },
  {
    routerLink:'/dashboard/d-base/chambres',
    Label:"Chambres",
    Icon:'bedroom_parent',
    access:access.chambres_access

  },
  {
    routerLink:'/dashboard/d-base/equipements',
    Label:"Equipements",
    Icon:'table_restaurant',
    access:access.equipement_access

  },
  {
    routerLink:'/dashboard/d-base/pannes',
    Label:"Types de Pannes",
    Icon:'report',
    access:access.panne_access
  },
  {
    routerLink:'/dashboard/d-base/pieces',
    Label:"Piéces de Rechange",
    Icon:'handyman',
    access:access.pieces_access

  },
  {
    routerLink:'/dashboard/reporting',
    Label:"Reporting",
    Icon:'monitoring',
    access:access.reporting_access
  },
]
