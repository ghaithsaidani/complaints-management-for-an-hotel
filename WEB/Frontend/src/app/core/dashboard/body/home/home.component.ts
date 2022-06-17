import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MyserviceService} from "../../../services/myservice.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private homeService:MyserviceService) { }

  ngOnInit(): void {

  }


  ngAfterViewInit() {
    setTimeout(()=>{
      this.homeService.setnomgestion("dashboard")
    },0)
  }

}
