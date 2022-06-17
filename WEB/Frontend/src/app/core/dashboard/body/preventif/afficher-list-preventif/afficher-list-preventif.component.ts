import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Preventif} from "../../../../../public/models/Preventif";
import {MyserviceService} from "../../../../services/myservice.service";
import {ConcernedService} from "../../../../services/concerned.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {Sort} from "@angular/material/sort";
import {AfficherDetailsPreventifComponent} from "../afficher-details-preventif/afficher-details-preventif.component";

@Component({
  selector: 'app-afficher-list-preventif',
  templateUrl: './afficher-list-preventif.component.html',
  styleUrls: ['./afficher-list-preventif.component.scss']
})
export class AfficherListPreventifComponent implements OnInit {

  preventif= new MatTableDataSource<Preventif>();
  hidded=true;
  all = false
  blocked = false
  active = true

  date = new Date();
  date1 = new Date();
  datesys = new Date();


  displayedColumns: string[] = ['equipement','datePrevu','etat',"avancement","settings"];

  constructor(private preventifservice :MyserviceService,private concernedService:ConcernedService,private _liveAnnouncer: LiveAnnouncer,private dialog:MatDialog) {

  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.getPreventif();

  }

  filter(key:string){
    this.preventif.filter = key;
  }

  public getPreventif():void{
    this.preventifservice.Get("/preventif/all").subscribe(
      (data)=>this.preventif.data=data

    )
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if(this.all) {
      this.getPreventif();
      this.preventif.filter = filterValue.trim().toLowerCase();
    }
  }


  openPrevntifDetailsDialog(preventif:Preventif){
    this.preventifservice.getDetails(preventif.id,"/preventif/find/").subscribe(data=>{
      this.concernedService.setpreventif(data)
      const dialogRef = this.dialog.open(AfficherDetailsPreventifComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
      this.concernedService.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(()=> {
        this.getPreventif()
      })
    })

  }

  compare(preventif: Preventif){
    this.date = new Date();

    this.datesys = new Date();

    this.date1 =new Date(preventif.datePrevue);
    this.datesys.setDate(this.datesys.getDate()+7);

    if (this.date1.getTime()<=(this.datesys.getTime()) && (this.date1.getTime()>=(this.date.getTime()))){
      return 1;

    }

    else if (this.date1.getTime()>=(this.date.getTime())){
      return 0;

    }

    else if (this.date1.getTime()<(this.date.getTime())){
      return 2;

    }
    else return null;


  }

}
