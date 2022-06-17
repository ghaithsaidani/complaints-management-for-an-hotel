import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../services/myservice.service";
import {AccessService} from "../../../services/access.service";

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss']
})
export class ReclamationsComponent implements OnInit {

  constructor(private reclamationService:MyserviceService,readonly access:AccessService) { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    setTimeout(()=>{
      this.reclamationService.setnomgestion("reclamations")
    },0)
  }

}
