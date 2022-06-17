import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MyserviceService} from "../../../../services/myservice.service";
import {ConcernedService} from "../../../../services/concerned.service";
import {Reclamation} from "../../../../../public/models/reclamations/Reclamation";
import {AddReclamationComponent} from "../add-reclamation/add-reclamation.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {ReclamationDetailsComponent} from "../reclamation-details/reclamation-details.component";
import {Reclamations, ReclamationsEquipement, ReclamationsPanne} from "../../../../../public/shared/Reclamations";
import {User} from "../../../../../public/models/User";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";





@Component({
  selector: 'app-consult-reclamations',
  templateUrl: './consult-reclamations.component.html',
  styleUrls: ['./consult-reclamations.component.scss']
})
export class ConsultReclamationsComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['designation','type','avancement','emplacement','priorite','nom_reclameur','etat-change','settings'];

  sortedData!: Reclamations[];




  reclamations = new MatTableDataSource<any>();
  hidded=true
  all = false
  blocked = false
  active = true
  jour!:boolean
  heure!:boolean
  minute!:boolean
  second!:boolean
  constructor(private cd:ChangeDetectorRef,private reclamationsService:MyserviceService,private concernedReclamation:ConcernedService,private _liveAnnouncer: LiveAnnouncer,private dialog:MatDialog) { }


  priorites=[
    {
      label:"Bas",
      color:"green"
    },
    {
      label:"Moyenne",
      color:"orange"
    },
    {
      label:"Éleve",
      color:"red"
    }

  ]

  ngOnInit(): void {

    this.getReclamations()
    this.filter('true')
    if((this.reclamations.data.filter((reclamation)=>reclamation.etat==false).length==0)){
      setInterval(()=>{
        this.all=(this.reclamations.data.filter((reclamation)=>reclamation.etat==false).length==0)
      })
    }

    //this.concernedReclamation.setReclamation()


  }

  ngAfterViewInit() {
    this.reclamations.paginator = this.paginator;
    this.reclamations.sort = this.sort;


  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges()
  }

  filter(key:string){
    this.reclamations.filter = key;
  }

  getReclamations() {

    this.reclamationsService.Get("/reclamations/all").subscribe(data=>{
      this.reclamations.data=data
    })


  }
  InstanceofreclamationEquipement(element:ReclamationsEquipement){
    return element.equipement!=null
  }

  InstanceofreclamationPanne(element:ReclamationsPanne){
    return element.chambre!=null && element.typePanne!=null
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.blocked){
      //this.getreclamations
      this.reclamations.data=this.reclamations.data.filter((reclamation)=>reclamation.etat==false)
      this.reclamations.filter =filterValue.trim().toLowerCase();
    }
    else if(this.active){
      //this.getreclamations
      this.reclamations.data=this.reclamations.data.filter((reclamation)=>reclamation.etat==true)
      this.reclamations.filter =filterValue.trim().toLowerCase();
    }
    else if(this.all) {
      this.getReclamations()
      this.reclamations.filter = filterValue.trim().toLowerCase();

    }
  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  openAddReclamationDialog(){
    const dialogRef = this.dialog.open(AddReclamationComponent,{autoFocus: false,panelClass: 'Steppers-dialog-container'});
    this.concernedReclamation.setDialogId(dialogRef.id)
    dialogRef.afterClosed().subscribe(()=> {
      this.getReclamations()
    })
  }

  openReclamationDetailsDialog(reclamation:Reclamation){
    this.reclamationsService.getDetails(reclamation.id,"/reclamations/find/").subscribe(data=>{
      this.concernedReclamation.setReclamation(data)
      const dialogRef = this.dialog.open(ReclamationDetailsComponent,{autoFocus: false,panelClass: 'Components-details-container'});
      this.concernedReclamation.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(()=> {
        this.getReclamations()
      })
    })

  }

  activate_desactivate(reclamation:Reclamation){
    if(reclamation.etat){
      this.reclamationsService.getDetails(reclamation.id,"/reclamations/find/").subscribe(data=> {
        reclamation.etat = false
        this.reclamationsService.activate_desactivate(data.id, "/reclamations/reclamation/desactivate/").subscribe()
        this.reclamations.data=this.reclamations.data
      })
    }
    else{
      this.reclamationsService.getDetails(reclamation.id, "/reclamations/find/").subscribe(data => {
        reclamation.etat = true
        this.reclamationsService.activate_desactivate(data.id, "/reclamations/reclamation/activate/").subscribe()
        this.reclamations.data=this.reclamations.data
      })
    }
  }

  openDialog(reclamation:Reclamation){
    let content= reclamation.etat ?"Voulez vous Desactiver cette Reclamation ?" : "Voulez vous Activer cette Reclamation ?"
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Reclamations",content: content},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{
        if(result=="true"){
          this.activate_desactivate(reclamation)
        }
        else{
          this.getReclamations()
        }
      }
    )




  }


  AllFilter() {

    if((this.reclamations.data.filter((reclamation)=>reclamation.etat==false).length>0)){
      this.getReclamations()

      this.filter('')
      this.all=true
      this.blocked=false
      this.active=false
    }

  }

  OtherFilters(etat:boolean) {
    if (etat) {
      this.getReclamations()
      this.filter('true')

      this.all = false
      this.blocked = false
      this.active = true
    }
    else {
      this.getReclamations()
      this.filter('false')

      this.all=false
      this.blocked=true
      this.active=false
    }


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



}
