import {Component, OnInit, ViewChild} from '@angular/core';
import { MyserviceService } from '../../../../../services/myservice.service';
import {ConcernedService} from "../../../../../services/concerned.service";
import {Local} from "../../../../../../public/models/Local";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {AddLocalComponent} from "../add-local/add-local.component";
import {LocalDetailsComponent} from "../local-details/local-details.component";
import {AccessService} from "../../../../../services/access.service";
import {Locaux} from "../../../../../../public/shared/Locaux";
import {User} from "../../../../../../public/models/User";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";





@Component({
  selector: 'app-consult-locaux',
  templateUrl: './consult-locaux.component.html',
  styleUrls: ['./consult-locaux.component.scss']
})
export class ConsultLocauxComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['description','parent','etat-change','settings'];

  locaux=new MatTableDataSource<Locaux>()
  hidded=true
  page!:any
  all = false
  blocked = false
  active = true


  constructor(private locauxService:MyserviceService,readonly accessService:AccessService,private concernedLocal:ConcernedService,private _liveAnnouncer: LiveAnnouncer,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getlocaux()
    this.filter('true')
    if((this.locaux.data.filter((local)=>local.etat==false).length==0)){
      setInterval(()=>{
        this.all=(this.locaux.data.filter((local)=>local.etat==false).length==0)
      })
    }
  }

  ngAfterViewInit() {
    this.locaux.paginator = this.paginator;
    this.locaux.sort = this.sort;
  }

  filter(key:string){
    this.locaux.filter = key;
  }

  getlocaux(){
    this.locauxService.Get("/locaux/all").subscribe(data=>{
          this.locaux.data=data

    })
  }


  openDialog(local:Local){
    let content= local.etat ?"Voulez vous Desactiver ce Local ?" : "Voulez vous Activer ce Local ?"
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Locaux",content: content},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{
        if(result=="true"){
          this.activate_desactivate(local)
        }
        else{
          this.getlocaux()
        }
      }
    )
  }

  activate_desactivate(local:Local){
    if(local.etat){
      this.locauxService.getDetails(local.id,"/locaux/find/").subscribe(data=> {
        local.etat = false
        this.locauxService.activate_desactivate(data.id, "/locaux/local/desactivate/").subscribe()
        this.locaux.data=this.locaux.data
      })
    }
    else{
      this.locauxService.getDetails(local.id, "/locaux/find/").subscribe(data => {
        local.etat = true
        this.locauxService.activate_desactivate(data.id, "/locaux/local/activate/").subscribe()
        this.locaux.data=this.locaux.data
      })
    }
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.blocked){
      //this.getlocaux
      this.locaux.data=this.locaux.data.filter((local)=>local.etat==false)
      this.locaux.filter =filterValue.trim().toLowerCase();
    }
    else if(this.active){
      //this.getlocaux
      this.locaux.data=this.locaux.data.filter((local)=>local.etat==true)
      this.locaux.filter =filterValue.trim().toLowerCase();
    }
    else if(this.all) {
      this.getlocaux()
      this.locaux.filter = filterValue.trim().toLowerCase();
    }
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  openAddLocalDialog(){
    const dialogRef = this.dialog.open(AddLocalComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
    this.concernedLocal.setDialogId(dialogRef.id)
    dialogRef.afterClosed().subscribe(()=> {
      this.getlocaux()
    })
  }


  openLocalDetailsDialog(local:Local){
    this.locauxService.getDetails(local.id,"/locaux/find/").subscribe(data=>{
      this.concernedLocal.setlocal(data)
      const dialogRef = this.dialog.open(LocalDetailsComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
      this.concernedLocal.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(()=> {
        this.getlocaux()
      })
    })

  }

  AllFilter() {

    if(this.locaux.data.filter((local)=>local.etat==false).length>0){

      this.getlocaux()

      this.filter('')
      this.all=true
      this.blocked=false
      this.active=false
    }

  }

  OtherFilters(etat:boolean) {
    if (etat) {
      this.getlocaux()
      this.filter('true')

      this.all = false
      this.blocked = false
      this.active = true
    }
    else {
      this.getlocaux()
      this.filter('false')
      this.all=false
      this.blocked=true
      this.active=false
    }


  }

}
