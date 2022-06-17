import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {MyserviceService} from "./core/services/myservice.service";
import {AccessService} from "./core/services/access.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Frontend';
  constructor(private authService:AuthService,private myService:MyserviceService,private accessService:AccessService) {}
  ngOnInit(): void {
    if(!this.authService.isloggedIn()){
      this.accessService.ngOnInit()
    }


  }





}
