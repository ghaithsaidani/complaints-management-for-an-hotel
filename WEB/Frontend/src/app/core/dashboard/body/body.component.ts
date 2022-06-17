import {Component, Input, OnInit} from '@angular/core';
import {TokenstorageService} from "../../services/tokenstorage.service";
import {MyserviceService} from "../../services/myservice.service";
import {ConcernedService} from "../../services/concerned.service";
import {AccountdetailsComponent} from "./accounts/accountdetails/accountdetails.component";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  @Input() collapsed =false
  @Input() screenWidth=0
  hidded=true
  constructor(public tokenStorage:TokenstorageService,public myservice:MyserviceService,private concerned:ConcernedService,private dialog:MatDialog) { }

  ngOnInit(): void {

  }


  showSearch(){
    this.hidded=!this.hidded
  }

  getBodyClass():string{
    let styleClass = ''
    if(this.collapsed && this.screenWidth>768){
      styleClass='body-trimmed'
    }
    if(this.collapsed && this.screenWidth<=768 && this.screenWidth>0){
      styleClass='body-md-screen'
    }
    return styleClass
  }

  modifyUser(){
      this.concerned.setuser(this.tokenStorage.getUser())
      const dialogRef = this.dialog.open(AccountdetailsComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
      this.concerned.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(()=> {

      })
  }

  /*getImage(){
    this.myservice.getDetails(this.tokenStorage.getUser().id,'/images/files/'+this.tokenStorage.getUser().)
  }*/



}
