import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../../services/myservice.service";
import {AccessService} from "../../../../services/access.service";

@Component({
  selector: 'app-locaux',
  templateUrl: './locaux.component.html',
  styleUrls: ['./locaux.component.scss']
})
export class LocauxComponent implements OnInit {


  constructor(private locauxservice:MyserviceService,readonly access:AccessService) { }

  ngOnInit(): void {
    //this.pagesService.setLocalpage(ConsultLocauxComponent)

  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.locauxservice.setnomgestion("locaux")
    },0)
  }

}
