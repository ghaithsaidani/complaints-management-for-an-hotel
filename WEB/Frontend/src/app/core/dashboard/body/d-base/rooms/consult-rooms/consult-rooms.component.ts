import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MyserviceService} from "../../../../../services/myservice.service";
import {ConcernedService} from "../../../../../services/concerned.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Room} from "../../../../../../public/models/Room";
import {MatDialog} from "@angular/material/dialog";
import {AddRoomComponent} from "../add-room/add-room.component";
import {RoomDetailsComponent} from "../room-details/room-details.component";
import {AccessService} from "../../../../../services/access.service";
import {Rooms} from "../../../../../../public/shared/Rooms";



@Component({
  selector: 'app-consult-rooms',
  templateUrl: './consult-rooms.component.html',
  styleUrls: ['./consult-rooms.component.scss']
})
export class ConsultRoomsComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['numero','settings'];

  rooms=new MatTableDataSource<Rooms>()
  hidded=true
  page!:any
  all = false
  blocked = false
  active = true


  constructor(private cd:ChangeDetectorRef,private roomsService:MyserviceService,readonly accessService:AccessService,private concernedRoom:ConcernedService,private _liveAnnouncer: LiveAnnouncer,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getRooms()
    this.filter('true')
    if((this.rooms.data.filter((room)=>room.etat==false).length==0)){
      setInterval(()=>{
        this.all=(this.rooms.data.filter((room)=>room.etat==false).length==0)
      })
    }
  }

  ngAfterViewInit() {
    this.rooms.paginator = this.paginator;
    this.rooms.sort = this.sort;
  }



  filter(key:string){
    this.rooms.filter = key;
  }

  getRooms(){
    this.roomsService.Get("/chambres/all").subscribe(data=>{
      this.rooms.data=data

    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.blocked){
      //this.getrooms
      this.rooms.data=this.rooms.data.filter((room)=>room.etat==false)
      this.rooms.filter =filterValue.trim().toLowerCase();
    }
    else if(this.active){
      //this.getrooms
      this.rooms.data=this.rooms.data.filter((room)=>room.etat==true)
      this.rooms.filter =filterValue.trim().toLowerCase();
    }
    else if(this.all) {
      this.getRooms()
      this.rooms.filter = filterValue.trim().toLowerCase();
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

  openAddRoomDialog(){
    const dialogRef = this.dialog.open(AddRoomComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
    this.concernedRoom.setDialogId(dialogRef.id)
    dialogRef.afterClosed().subscribe(()=> {
      this.getRooms()
    })
  }


  openRoomDetailsDialog(room:Room){
    this.roomsService.getDetails(room.id,"/chambres/find/").subscribe(data=>{
      this.concernedRoom.setroom(data)
      const dialogRef = this.dialog.open(RoomDetailsComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
      this.concernedRoom.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(()=> {
        this.getRooms()
      })
    })

  }

  addEtatColumn() {

    if(this.displayedColumns.indexOf("etat-change")==-1 && (this.rooms.data.filter((room)=>room.etat==false).length>0)){
      this.displayedColumns.splice(1,0,'etat-change');
      this.getRooms()
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
      this.getRooms()
      this.filter('true')
      //this.filters=[]
      //this.filters.push("Comptes actives")
      this.all = false
      this.blocked = false
      this.active = true
    }
    else {
      this.getRooms()
      this.filter('false')
      //this.filters=[]
      //this.filters.push("Comptes desactivés")
      this.all=false
      this.blocked=true
      this.active=false
    }


  }

}
