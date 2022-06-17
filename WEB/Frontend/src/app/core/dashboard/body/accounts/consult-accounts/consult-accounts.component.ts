import {Router} from '@angular/router';
import {AddAccountComponent} from '../add-account/add-account.component';
import {AccountdetailsComponent} from '../accountdetails/accountdetails.component';
import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

import {FormControl} from "@angular/forms";
import {Users} from "../../../../../public/shared/Users";
import {TokenstorageService} from "../../../../services/tokenstorage.service";
import {MyserviceService} from "../../../../services/myservice.service";
import {AuthService} from "../../../../services/auth.service";
import {ConcernedService} from "../../../../services/concerned.service";
import {User} from "../../../../../public/models/User";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";


@Component({
  selector: 'app-consult-accounts',
  templateUrl: './consult-accounts.component.html',
  styleUrls: ['./consult-accounts.component.scss']
})
export class ConsultAccountsComponent implements OnInit,AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['email','name','tel','fonction','etat-change','settings'];
  jour!:boolean
  heure!:boolean
  minute!:boolean
  second!:boolean
  checked!:boolean




  public users=new MatTableDataSource<Users>();
  hidded=true
  page!:any
  all = false
  blocked = false
  active = true

  constructor(private cd:ChangeDetectorRef,private tokenService:TokenstorageService,private accountService:MyserviceService,private authService:AuthService,private router:Router,readonly concernedUser:ConcernedService,private _liveAnnouncer: LiveAnnouncer,private dialog:MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getaccounts()
    this.filter('true')
    if((this.users.data.filter((user)=>user.etat==false).length==0)){
      setInterval(()=>{
        this.all=(this.users.data.filter((user)=>user.etat==false).length==0)
      })
    }






  }



  CreationDateCtrl=new FormControl('')

  ngAfterViewInit() {
    //setTimeout(()=>,0)
    setTimeout(()=> {
      this.CreationDateCtrl = new FormControl(this.CreationDateCtrl.value)
      /*this.sort.active="createdAt"
      this.sort.direction="desc"*/
    },0)
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.blocked){
      //this.getaccounts()
      this.users.data=this.users.data.filter((user)=>user.etat==false)
      this.users.filter =filterValue.trim().toLowerCase();
    }
    else if(this.active){
      //this.getaccounts()
      this.users.data=this.users.data.filter((user)=>user.etat==true)
      this.users.filter =filterValue.trim().toLowerCase();
    }
    else{
      this.getaccounts()
      this.users.filter = filterValue.trim().toLowerCase();
    }
  }

  filter(key:string){
    this.users.filter = key;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges()
  }

  getaccounts(){
    this.accountService.Get("/users/all").subscribe(data=>{
          this.users.data=data.filter((user)=>user.email!=this.tokenService.getUser().email)
    })
  }

  openAddAccountDialog(){
    const dialogRef = this.dialog.open(AddAccountComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
    this.concernedUser.setDialogId(dialogRef.id)
    dialogRef.afterClosed().subscribe(()=> {
      this.getaccounts()
    })
  }

  openAccountDetailsDialog(user:User){
    this.accountService.getDetails(user.id,"/users/find/").subscribe(data=>{
      this.concernedUser.setuser(data)
      const dialogRef = this.dialog.open(AccountdetailsComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
      this.concernedUser.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(()=> {
        this.getaccounts()
      })
    })

  }




  Details(user:User){
    this.accountService.getDetails(user.id,"/users/find/").subscribe(data=>{
      this.concernedUser.setuser(data)
    })

  }





  calculateDiff(data:Date){
    let date = new Date(data);
    let currentDate = new Date();
    if(Math.floor((currentDate.getTime() - date.getTime()))/1000<60){
      this.jour=false
      this.heure=false
      this.minute=false
      this.second=true
      return parseInt(String(Math.floor(currentDate.getTime() - date.getTime()) / (1000)).split('.')[0])
    }
    else if(Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 ) )<60){
      this.jour=false
      this.heure=false
      this.minute=true
      this.second=false
      return Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60))
    }

    if(Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 *60))<24){
      this.jour=false
      this.heure=true
      this.minute=false
      this.second=false
      return Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 *60) )
    }

    else {
      this.jour=true
      this.heure=false
      this.minute=false
      this.second=false
      return Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    }

  }


  AllFilter() {

    if((this.users.data.filter((user)=>user.etat==false).length>0)){
      this.getaccounts()
      this.filter('')
      this.all=true
      this.blocked=false
      this.active=false
    }

  }

  OtherFilters(etat:boolean) {
    if (etat) {
      this.getaccounts()
      this.filter('true')
      this.all = false
      this.blocked = false
      this.active = true
    }
    else {
      this.getaccounts()
      this.filter('false')
      this.all=false
      this.blocked=true
      this.active=false
    }


  }

  openDialog(user:User){
    let content= user.etat ?"Voulez vous Desactiver cette Compte ?" : "Voulez vous Activer cette Compte ?"
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Comptes",content: content},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{
      if(result=="true"){
        this.activate_desactivate(user)
      }
      else{
        this.getaccounts()
      }
    }
    )
  }


  activate_desactivate(user:User){
    if(user.etat){
      this.accountService.getDetails(user.id,"/users/find/").subscribe(data=> {
        user.etat=false
        this.accountService.activate_desactivate(data.id, "/users/user/desactivate/").subscribe()
        this.users.data=this.users.data
      })
    }
    else{
      this.accountService.getDetails(user.id, "/users/find/").subscribe(data => {
        user.etat = true
        this.accountService.activate_desactivate(data.id, "/users/user/activate/").subscribe()
        this.users.data=this.users.data

      })
    }

    //this.users.data=this.users.data
    //this.getaccounts()
  }
}
