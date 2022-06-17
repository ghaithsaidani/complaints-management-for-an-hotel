import {Component, OnInit} from '@angular/core';
import {ConcernedService} from "../../../../services/concerned.service";

import {OtReclamationPanne} from "../../../../../public/models/ot/OtReclamationPanne";
import * as moment from 'moment';
import 'moment-duration-format';
import {MyserviceService} from "../../../../services/myservice.service";
import {OtReclamationEquipements, OtReclamationPannes} from "../../../../../public/shared/Ots";
import {MatDialog} from "@angular/material/dialog";
import {registerLocaleData} from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import {LigneOtPanne} from "../../../../../public/models/ot/lignes/LigneOtPanne";
import {LigneOtEquipement} from "../../../../../public/models/ot/lignes/LigneOtEquipement";

@Component({
  selector: 'app-ot-details',
  templateUrl: './ot-details.component.html',
  styleUrls: ['./ot-details.component.scss']
})
export class OtDetailsComponent implements OnInit {


  ot:any
  myOt=this.concernedOt.getot()
  spinning=false



  constructor(private service:MyserviceService,private concernedOt:ConcernedService,private dialog:MatDialog) {
    registerLocaleData(localeFr, 'fr');
  }

  ngOnInit(): void {
    /*if (this.InstanceofOtEquipement(this.concernedOt.getot() as unknown as OtReclamationEquipements))
      this.ot=this.concernedOt.getot() as unknown as OtReclamationEquipements
    else if(this.InstanceofOtPanne(this.concernedOt.getot() as unknown as OtReclamationPanne)){
      this.ot=this.concernedOt.getot() as unknown as OtReclamationPanne
    }
*/

  }

  InstanceofOtEquipement(element:OtReclamationEquipements){
    return element.reclamationsEquipement!=null
  }

  InstanceofOtPanne(element:OtReclamationPannes){
    return element.reclamationsPannes!=null
  }

  exportpdf(){
    this.spinning=true
    this.service.exportPdfOt(this.concernedOt.getot().id).subscribe(res => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      this.spinning=false
    })
  }


  quit(){
    this.dialog.getDialogById(this.concernedOt.getDialogId())?.close()
  }


  TempsEstime(element:any){
    let periodsum=moment.duration(0)
    if(this.InstanceofOtPanne(element)){
      element.reclamationsPannes.map((ligneOt:LigneOtPanne)=>{
        periodsum.add(ligneOt.tempsEstime)})
      if(moment.duration(periodsum,'minutes').hours()==0){
        return moment.duration(periodsum, 'minutes').minutes() + " minutes";
      }
      return moment.duration(periodsum, 'minutes').hours()+" heures " + moment.duration(periodsum, 'minutes').minutes() + " minutes"
    }
    else if(this.InstanceofOtEquipement(element)){
      element.reclamationsEquipement.map((ligneOt:LigneOtEquipement)=>{
        periodsum.add(ligneOt.tempsEstime)})
      if(moment.duration(periodsum,'minutes').hours()==0){
        return moment.duration(periodsum, 'minutes').minutes() + " minutes";
      }
      return moment.duration(periodsum, 'minutes').hours()+" heures " + moment.duration(periodsum, 'minutes').minutes() + " minutes"
    }
    else return null


  }


}
