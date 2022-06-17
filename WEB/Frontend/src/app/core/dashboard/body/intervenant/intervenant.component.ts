import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../services/myservice.service";
import {AccessService} from "../../../services/access.service";


@Component({
  selector: 'app-intervenant',
  templateUrl: './intervenant.component.html',
  styleUrls: ['./intervenant.component.scss']
})
export class IntervenantComponent implements OnInit {

  constructor(readonly access:AccessService,private intervenantService:MyserviceService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.intervenantService.setnomgestion("Intervenants")
    },0)
  }

}
