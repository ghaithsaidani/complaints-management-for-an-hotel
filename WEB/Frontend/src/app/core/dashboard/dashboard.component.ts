import { Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {TokenstorageService} from "../services/tokenstorage.service";
import {AccountsGuard} from "../guards/accounts.guard";
import {Router} from "@angular/router";

interface SideNavToggle{
  screenWidth: number,
  collapsed:boolean
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isSideNavCollapsed= false;
  screenWidth=0;




  constructor(private authService:AuthService,private tokenService:TokenstorageService,readonly accountGuard:AccountsGuard,private router:Router) {

   }

  ngOnInit(): void {
    this.refreshtoken()

    //console.log(this.accountGuard.canActivate().valueOf())
  }

  refreshtoken(){
    this.authService.GenerateRefreshToken().subscribe(
      data=>{
        this.tokenService.saveToken(data.access_token)
        this.tokenService.saveRefreshToken(data.refresh_token)
      }
    )
  }

  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth=data.screenWidth
    this.isSideNavCollapsed=data.collapsed

  }








}
