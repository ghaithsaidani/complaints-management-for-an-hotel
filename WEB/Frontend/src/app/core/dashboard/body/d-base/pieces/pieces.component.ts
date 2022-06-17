import { Component, OnInit} from '@angular/core';
import {MyserviceService} from "../../../../services/myservice.service";
import {AccessService} from "../../../../services/access.service";

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.scss']
})
export class PiecesComponent implements OnInit {

  constructor(private piecesService:MyserviceService,readonly access:AccessService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.piecesService.setnomgestion("pieces de rechange")
    },0)
  }

}
