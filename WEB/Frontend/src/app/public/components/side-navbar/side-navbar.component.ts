import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import {AccessService} from "../../../core/services/access.service";
import {TokenstorageService} from "../../../core/services/tokenstorage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SideNavService} from "../../../core/services/side-nav.service";
export interface NavbarItems{
  routerLink:string;
  Label:string;
  Icon:string,
  access:boolean

}

interface SideNavToggle{
  screenWidth: number,
  collapsed:boolean
}
@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {
  @Output() onToggleSideNav : EventEmitter<SideNavToggle>=new EventEmitter();
  collapsed=false
  screenWidth = 0

  constructor(private access:AccessService,private tokenService:TokenstorageService,private router:Router,readonly sideNavService:SideNavService) {
    //this.access.ngOnInit()
  }





  /*get navData(): NavbarItems[] {
    return this._navData;
  }*/

  ngOnInit(): void {

    //this.sideNavService.NavbarData
    this.sideNavService.NavbarData=this.sideNavService.NavbarData.filter((data)=>data.access)
    this.screenWidth=window.innerWidth

    //this.navData=this.sidenavService.NavbarData.filter((data)=>data.access)*/
    /*this.navData=this.navData.filter((data)=> {


    })*/
  }


  logout(){
    this.tokenService.signOut()
    this.router.navigate(['/auth/login'])
  }

  toggleCollapse(){
    this.collapsed = !this.collapsed
    this.onToggleSideNav.emit({screenWidth:this.screenWidth,collapsed:this.collapsed})
  }
  sideNavClosed(){
    this.collapsed=false
    this.onToggleSideNav.emit({screenWidth:this.screenWidth,collapsed:this.collapsed})
  }




  /*ngAfterViewInit(): void {
    //this.navData=this.NavbarData

    this.navData=this.NavbarData
    this.navData=this.navData.filter((data)=>data.access)
    //setInterval(()=>{this.access.accounts_access=this.access.account.consult || this.access.account.add || this.access.account.modify || this.access.account.getdetails}, 0);

    this.cd.detectChanges()
    //setTimeout(()=>,0)
    console.log(this.NavbarData)
    console.log(this.navData)
  }*/

}
