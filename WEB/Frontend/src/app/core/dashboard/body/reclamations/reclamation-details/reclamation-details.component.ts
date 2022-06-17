import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../../services/myservice.service";
import {ConcernedService} from "../../../../services/concerned.service";
import {ReclamationsEquipement, ReclamationsPanne} from "../../../../../public/shared/Reclamations";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-reclamation-details',
  templateUrl: './reclamation-details.component.html',
  styleUrls: ['./reclamation-details.component.scss']
})
export class ReclamationDetailsComponent implements OnInit {

  priorites=[
    {
      label:"Bas",
      color:"green"
    },
    {
      label:"Moyenne",
      color:"orange"
    },
    {
      label:"Éleve",
      color:"red"
    }

  ]

  myreclamation=this.concernedReclamation.getReclamation()
  constructor(private reclamationService:MyserviceService,private concernedReclamation:ConcernedService,private dialog:MatDialog) { }

  ngOnInit(): void {
    registerLocaleData(localeFr, 'fr');
  }

  InstanceofreclamationEquipement(element:ReclamationsEquipement){
    return element.equipement!=null
  }

  InstanceofreclamationPanne(element:ReclamationsPanne){
    return element.chambre!=null && element.typePanne!=null
  }

  quit(){
    this.dialog.getDialogById(this.concernedReclamation.getDialogId())?.close()
  }



}
