import {Component, OnInit, ViewChild} from '@angular/core';
import {Intervenants} from "../../../../../public/shared/Intervenants";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator} from "@angular/material/paginator";
import {ConcernedService} from "../../../../services/concerned.service";
import {MyserviceService} from "../../../../services/myservice.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {Intervenant} from "../../../../../public/models/Intervenant";
import {AfficherDetailsIntervenantComponent} from "../afficher-details-intervenant/afficher-details-intervenant.component";
import {AjouterIntervenantComponent} from "../ajouter-intervenant/ajouter-intervenant.component";
import {User} from "../../../../../public/models/User";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";




@Component({
  selector: 'app-liste-intervenant',
  templateUrl: './liste-intervenant.component.html',
  styleUrls: ['./liste-intervenant.component.scss']
})
export class ListeIntervenantComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hidded=true;

  intervenants=new MatTableDataSource<Intervenants>();
  displayedColumns: string[] = ['nom','profession','disponibilite','etat-change','settings'];
  all = false
  blocked = false
  active = true


  constructor(private intervenantService:MyserviceService,private _liveAnnouncer: LiveAnnouncer,private concernedService:ConcernedService,private dialog:MatDialog){}

  ngOnInit(): void {
    this.getIntervenants();
    this.filter('true')
    if((this.intervenants.data.filter((intervenant)=>intervenant.etat==false).length==0)){
      setInterval(()=>{
        this.all=(this.intervenants.data.filter((intervenant)=>intervenant.etat==false).length==0)
      })
    }
  }

  ngAfterViewInit() {
    this.intervenants.paginator = this.paginator;
    this.intervenants.sort = this.sort;

  }



  public getIntervenants():void{
    this.intervenantService.Get("/intervenants/all").subscribe(
      (data)=>{
        this.intervenants.data=data
      }

    )
  }


  filter(key:string){
    this.intervenants.filter = key;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.blocked){
      //this.getintervenants
      this.intervenants.data=this.intervenants.data.filter((intervenant)=>intervenant.etat==false)
      this.intervenants.filter =filterValue.trim().toLowerCase();
    }
    else if(this.active){
      //this.getintervenants
      this.intervenants.data=this.intervenants.data.filter((intervenant)=>intervenant.etat==true)
      this.intervenants.filter =filterValue.trim().toLowerCase();
    }
    else if(this.all) {
      this.getIntervenants()
      this.intervenants.filter = filterValue.trim().toLowerCase();
    }
  }

  openAddIntervenantDialog(){
    const dialogRef = this.dialog.open(AjouterIntervenantComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
    this.concernedService.setDialogId(dialogRef.id)
    dialogRef.afterClosed().subscribe(()=> {
      this.getIntervenants()
    })
  }


  openIntervenantDetailsDialog(intervenant:Intervenant){
    this.intervenantService.getDetails(intervenant.id,"/intervenants/chercherParId/").subscribe(data=>{
      this.concernedService.setintervenant(data)
      const dialogRef = this.dialog.open(AfficherDetailsIntervenantComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
      this.concernedService.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(()=> {
        this.getIntervenants()
      })
    })

  }

  AllFilter() {

    if(this.intervenants.data.filter((intervenant)=>intervenant.etat==false).length>0){
      this.getIntervenants()
      //this.filters=[]
      //this.filters.push("Tous les comptes")
      this.filter('')
      this.all=true
      this.blocked=false
      this.active=false
    }

  }

  OtherFilters(etat:boolean) {
    if (etat) {
      this.getIntervenants()
      this.filter('true')

      this.all = false
      this.blocked = false
      this.active = true
    }
    else {
      this.getIntervenants()
      this.filter('false')
      this.all=false
      this.blocked=true
      this.active=false
    }


  }

  openActivationDialog(intervenant:Intervenant){
    let content= intervenant.etat ?"Voulez vous Desactiver cet intervenant ?" : "Voulez vous Activer cet intervenant ?"
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Intervenants",content: content},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{
        if(result=="true"){
          this.activate_desactivate(intervenant)
        }
        else{
          this.getIntervenants()
        }
      }
    )
  }


  activate_desactivate(intervenant:Intervenant){
    if(intervenant.etat){
      this.intervenantService.getDetails(intervenant.id,"/intervenants/chercherParId/").subscribe(data=> {
        intervenant.etat = false
        this.intervenantService.activate_desactivate(data.id, "/intervenants/intervenant/desactivate/").subscribe()
        this.intervenants.data=this.intervenants.data
      })
    }
    else{
      this.intervenantService.getDetails(intervenant.id, "/intervenants/chercherParId/").subscribe(data => {
        intervenant.etat = true
        this.intervenantService.activate_desactivate(data.id, "/intervenants/intervenant/activate/").subscribe()
        this.intervenants.data=this.intervenants.data
      })
    }
  }



}
