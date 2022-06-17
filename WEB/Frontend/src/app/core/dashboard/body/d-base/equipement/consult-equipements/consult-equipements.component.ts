import {Component, OnInit, ViewChild} from '@angular/core';
import { MyserviceService } from '../../../../../services/myservice.service';
import { Equipement } from '../../../../../../public/models/Equipement';
import {EquipementComponent} from "../equipement.component";
import {ConcernedService} from "../../../../../services/concerned.service";
import {AddEquipementComponent} from "../add-equipement/add-equipement.component";
import {EquipementdetailsComponent} from "../equipementdetails/equipementdetails.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {Equipements} from "../../../../../../public/shared/Equipements";
import {AccessService} from "../../../../../services/access.service";
import {User} from "../../../../../../public/models/User";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";





@Component({
  selector: 'app-consult-equipements',
  templateUrl: './consult-equipements.component.html',
  styleUrls: ['./consult-equipements.component.scss']
})
export class ConsultEquipementsComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['designation','numSerie','etat-equipement','local','etat-change','settings'];

  equipements=new MatTableDataSource<Equipements>()
  hidded=true

  all = false
  blocked = false
  active = true

  constructor(readonly access:AccessService,private equipementsService:MyserviceService,private equipementComponent:EquipementComponent,private concernedEquipement:ConcernedService,private _liveAnnouncer: LiveAnnouncer,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getequipements()
    this.filter('true')
    if((this.equipements.data.filter((equipement)=>equipement.etat==false).length==0)){
      setInterval(()=>{
        this.all=(this.equipements.data.filter((equipement)=>equipement.etat==false).length==0)
      })
    }
  }

  filter(key:string){
    this.equipements.filter = key;
  }
  getequipements(){
    this.equipementsService.Get("/equipements/all").subscribe(data=>{
          this.equipements.data=data

    })
  }

  ngAfterViewInit() {
    this.equipements.paginator = this.paginator;
    this.equipements.sort = this.sort;
  }



  /*modifyEquipement(equipement:Equipement){
    this.equipementsService.getDetails(equipement.id,"/equipements/find/").subscribe(data=>{
      this.concernedEquipement.setequipement(data)
      this.pagesService.setEquipementpage(ModifyEquipementComponent);
    })
  }

  Details(equipement:Equipement){
    this.equipementsService.getDetails(equipement.id,"/equipements/find/").subscribe(data=>{
      this.concernedEquipement.setequipement(data)
      this.pagesService.setEquipementpage(EquipementdetailsComponent);

    })

  }

  AddEquipement(){
    this.pagesService.setEquipementpage(AddEquipementComponent);
  }*/

  activate_desactivate(equipement:Equipement){
    if(equipement.etat){
      this.equipementsService.getDetails(equipement.id,"/equipements/find/").subscribe(data=> {
        equipement.etat = false
        this.equipementsService.activate_desactivate(data.id, "/equipements/equipement/desactivate/").subscribe()
        this.equipements.data=this.equipements.data
      })
    }
    else{
      this.equipementsService.getDetails(equipement.id, "/equipements/find/").subscribe(data => {
        equipement.etat = true
        this.equipementsService.activate_desactivate(data.id, "/equipements/equipement/activate/").subscribe()
        this.equipements.data=this.equipements.data
      })
    }

  }


  openDialog(equipement:Equipement){
    let content= equipement.etat ?"Voulez vous Desactiver cette Equipement ?" : "Voulez vous Activer cette Equipement ?"
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Equipements",content: content},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{
        if(result=="true"){
          this.activate_desactivate(equipement)
        }
        else{
          this.getequipements()
        }
      }
    )
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.blocked){
      //this.getequipements
      this.equipements.data=this.equipements.data.filter((equipement)=>equipement.etat==false)
      this.equipements.filter =filterValue.trim().toLowerCase();
    }
    else if(this.active){
      //this.getequipements
      this.equipements.data=this.equipements.data.filter((equipement)=>equipement.etat==true)
      this.equipements.filter =filterValue.trim().toLowerCase();
    }
    else if(this.all) {
      this.getequipements()
      this.equipements.filter = filterValue.trim().toLowerCase();
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


  openAddEquipementDialog(){
    const dialogRef = this.dialog.open(AddEquipementComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
    this.concernedEquipement.setDialogId(dialogRef.id)
    dialogRef.afterClosed().subscribe(()=> {
      this.getequipements()
    })
  }


  openEquipementDetailsDialog(equipement:Equipement){
    this.equipementsService.getDetails(equipement.id,"/equipements/find/").subscribe(data=>{
      this.concernedEquipement.setequipement(data)
      const dialogRef = this.dialog.open(EquipementdetailsComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
      this.concernedEquipement.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(()=> {
        this.getequipements()
      })
    })

  }

  AllFilter() {

    if((this.equipements.data.filter((equipement)=>equipement.etat==false).length>0)){
      this.getequipements()
      //this.filters=[]
      //this.filters.push("Tous les comptes")
      this.filter('')
      this.all=true
      this.blocked=false
      this.active=false
    }

  }

  OtherFilter(etat:boolean) {
    if (etat) {
      this.getequipements()
      this.filter('true')
      //this.filters=[]
      //this.filters.push("Comptes actives")
      this.all = false
      this.blocked = false
      this.active = true
    }
    else {
      this.getequipements()
      this.filter('false')
      //this.filters=[]
      //this.filters.push("Comptes desactivés")
      this.all=false
      this.blocked=true
      this.active=false
    }


  }

}
