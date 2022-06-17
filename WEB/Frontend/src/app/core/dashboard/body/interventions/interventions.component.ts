import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../services/myservice.service";
import {AccessService} from "../../../services/access.service";

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss']
})
export class InterventionsComponent implements OnInit {

  constructor(private interventionService:MyserviceService,readonly access:AccessService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.interventionService.setnomgestion("Interventions")
    },0)
  }

}
