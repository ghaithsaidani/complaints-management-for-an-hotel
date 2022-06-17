import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../services/myservice.service";
import {AccessService} from "../../../services/access.service";

@Component({
  selector: 'app-ot',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.scss']
})
export class OtComponent implements OnInit {

  constructor(private otService:MyserviceService,readonly access:AccessService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.otService.setnomgestion("Ordres de travail")
    },0)
  }

}
