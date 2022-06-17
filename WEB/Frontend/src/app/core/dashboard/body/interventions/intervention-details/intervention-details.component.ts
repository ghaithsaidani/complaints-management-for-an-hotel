import { Component, OnInit } from '@angular/core';
import {ConcernedService} from "../../../../services/concerned.service";
import {OtReclamationEquipements, OtReclamationPannes} from "../../../../../public/shared/Ots";
import {MatDialog} from "@angular/material/dialog";
import {registerLocaleData} from "@angular/common";
import localeFr from "@angular/common/locales/fr";

@Component({
  selector: 'app-intervention-details',
  templateUrl: './intervention-details.component.html',
  styleUrls: ['./intervention-details.component.scss']
})
export class InterventionDetailsComponent implements OnInit {

  intervention=this.concernedIntervention.getintervention()
  constructor(private concernedIntervention:ConcernedService,private dialog:MatDialog) {

  }

  ngOnInit(): void {
    registerLocaleData(localeFr, 'fr');
  }

  quit(){
    this.dialog.getDialogById(this.concernedIntervention.getDialogId())?.close()
  }

  InstanceofOtEquipement(element:OtReclamationEquipements){
    return element.reclamationsEquipement!=null
  }

  InstanceofOtPanne(element:OtReclamationPannes){
    return element.reclamationsPannes!=null
  }

}
