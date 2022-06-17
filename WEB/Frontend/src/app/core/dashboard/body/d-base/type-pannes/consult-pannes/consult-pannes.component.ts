import {Component, OnInit, ViewChild} from '@angular/core';
import {MyserviceService} from "../../../../../services/myservice.service";
import {ConcernedService} from "../../../../../services/concerned.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {Panne} from "../../../../../../public/models/Panne";
import {PanneDetailsComponent} from "../panne-details/panne-details.component";
import {AddPanneComponent} from "../add-panne/add-panne.component";
import {Pannes} from "../../../../../../public/shared/Pannes";






@Component({
  selector: 'app-consult-pannes',
  templateUrl: './consult-pannes.component.html',
  styleUrls: ['./consult-pannes.component.scss']
})
export class ConsultPannesComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['designation','settings'];

  pannes=new MatTableDataSource<Pannes>()
  hidded=true
  page!:any
  all = false
  blocked = false
  active = true


  constructor(private pannesService:MyserviceService,private concernedPanne:ConcernedService,private _liveAnnouncer: LiveAnnouncer,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getPannes()
    this.filter('true')
    if((this.pannes.data.filter((panne)=>panne.etat==false).length==0)){
      setInterval(()=>{
        this.all=(this.pannes.data.filter((panne)=>panne.etat==false).length==0)
      })
    }
  }

  ngAfterViewInit() {
    this.pannes.paginator = this.paginator;
    this.pannes.sort = this.sort;
  }

  filter(key:string){
    this.pannes.filter = key;
  }

  getPannes(){
    this.pannesService.Get("/pannes/all").subscribe(data=>{
      this.pannes.data=data

    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.blocked){
      //this.getpannes
      this.pannes.data=this.pannes.data.filter((panne)=>panne.etat==false)
      this.pannes.filter =filterValue.trim().toLowerCase();
    }
    else if(this.active){
      //this.getpannes
      this.pannes.data=this.pannes.data.filter((panne)=>panne.etat==true)
      this.pannes.filter =filterValue.trim().toLowerCase();
    }
    else if(this.all) {
      this.getPannes()
      this.pannes.filter = filterValue.trim().toLowerCase();
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


  openAddPanneDialog(){
    const dialogRef = this.dialog.open(AddPanneComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
    this.concernedPanne.setDialogId(dialogRef.id)
    dialogRef.afterClosed().subscribe(()=> {
      this.getPannes()
    })
  }


  openPanneDetailsDialog(panne:Panne){
    this.pannesService.getDetails(panne.id,"/pannes/find/").subscribe(data=>{
      this.concernedPanne.setPanne(data)
      const dialogRef = this.dialog.open(PanneDetailsComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
      this.concernedPanne.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(()=> {
        this.getPannes()
      })
    })

  }

  addEtatColumn() {

    if(this.displayedColumns.indexOf("etat-change")==-1 && (this.pannes.data.filter((panne)=>panne.etat==false).length>0)){
      this.displayedColumns.splice(1,0,'etat-change');
      this.getPannes()
      //this.filters=[]
      //this.filters.push("Tous les comptes")
      this.filter('')
      this.all=true
      this.blocked=false
      this.active=false
    }

  }

  removeEtatColumn(etat:boolean) {
    this.displayedColumns=this.displayedColumns.filter((column)=>column!='etat-change')
    if (etat) {
      this.getPannes()
      this.filter('true')
      //this.filters=[]
      //this.filters.push("Comptes actives")
      this.all = false
      this.blocked = false
      this.active = true
    }
    else {
      this.getPannes()
      this.filter('false')
      //this.filters=[]
      //this.filters.push("Comptes desactivés")
      this.all=false
      this.blocked=true
      this.active=false
    }


  }

}
