import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../../services/myservice.service";
import {AccessService} from "../../../../services/access.service";

@Component({
  selector: 'app-type-pannes',
  templateUrl: './type-pannes.component.html',
  styleUrls: ['./type-pannes.component.scss']
})
export class TypePannesComponent implements OnInit {

  constructor(private pannesService:MyserviceService,readonly access:AccessService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.pannesService.setnomgestion("types de pannes")
    },0)
  }

}
