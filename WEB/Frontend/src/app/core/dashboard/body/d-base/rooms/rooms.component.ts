import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../../services/myservice.service";
import {AccessService} from "../../../../services/access.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(private roomsService:MyserviceService,readonly access:AccessService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.roomsService.setnomgestion("chambres")
    },0)
  }

}
