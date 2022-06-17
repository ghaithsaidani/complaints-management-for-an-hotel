import {Component,  OnInit} from '@angular/core';
import { MyserviceService } from '../../../services/myservice.service';

import {AccessService} from "../../../services/access.service";


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})

export class AccountsComponent implements OnInit{



  page!:any
  constructor(private accountService:MyserviceService,public accountsAcces:AccessService) {

  }
  ngOnInit(): void {

  }


  ngAfterViewInit() {
    setTimeout(()=>{
      this.accountService.setnomgestion("comptes")
    },0)
  }














}
