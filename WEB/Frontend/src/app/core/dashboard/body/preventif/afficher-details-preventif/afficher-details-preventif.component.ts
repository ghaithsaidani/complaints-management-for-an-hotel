import { Component, OnInit } from '@angular/core';
import {ConcernedService} from "../../../../services/concerned.service";
import {MatDialog} from "@angular/material/dialog";
import {registerLocaleData} from "@angular/common";
import localeFr from "@angular/common/locales/fr";

@Component({
  selector: 'app-afficher-details-preventif',
  templateUrl: './afficher-details-preventif.component.html',
  styleUrls: ['./afficher-details-preventif.component.scss']
})
export class AfficherDetailsPreventifComponent implements OnInit {
  preventif=this.concernedService.getpreventif();
  date = new Date();
  date1 = new Date(this.preventif.datePrevue);
  datesys = new Date();

  number=5;
  constructor(private concernedService:ConcernedService,private dialog:MatDialog) {

  }

  ngOnInit(): void {
    registerLocaleData(localeFr, 'fr');
    this.compare();
  }
  compare(){
    this.datesys.setDate(this.datesys.getDate()+7);

    if (this.date1.getTime()<=(this.datesys.getTime()) && (this.date1.getTime()>=(this.date.getTime()))){
      this.number= 1;

    }

    else if (this.date1.getTime()>=(this.date.getTime())){
      this.number= 0;

    }

    else if (this.date1.getTime()<(this.date.getTime())){
      this.number= 2;

    }

    return null;
  }

  quit(){
    this.dialog.getDialogById(this.concernedService.getDialogId())?.close()
  }





}
