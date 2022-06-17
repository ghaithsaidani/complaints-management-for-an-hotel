
import { Component, OnInit } from '@angular/core';
import {ConsultEquipementsComponent} from "./consult-equipements/consult-equipements.component";
import {MyserviceService} from "../../../../services/myservice.service";
import {AccessService} from "../../../../services/access.service";

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.scss']
})
export class EquipementComponent implements OnInit {




  constructor(private equipementsService:MyserviceService,readonly access:AccessService) { }





  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.equipementsService.setnomgestion("equipements")
    },0)
  }

}
