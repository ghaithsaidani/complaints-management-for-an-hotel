import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../services/myservice.service";
import {AccessService} from "../../../services/access.service";

@Component({
  selector: 'app-preventif',
  templateUrl: './preventif.component.html',
  styleUrls: ['./preventif.component.scss']
})
export class PreventifComponent implements OnInit {

  constructor(private otService:MyserviceService,readonly access:AccessService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.otService.setnomgestion("préventives systéme")
    },0)
  }

}
