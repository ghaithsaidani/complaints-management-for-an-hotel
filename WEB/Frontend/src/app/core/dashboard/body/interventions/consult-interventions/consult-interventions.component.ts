import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MyserviceService} from "../../../../services/myservice.service";
import {MatDialog} from "@angular/material/dialog";
import {ConcernedService} from "../../../../services/concerned.service";
import {AddInterventionComponent} from "../add-intervention/add-intervention.component";
import {InterventionDetailsComponent} from "../intervention-details/intervention-details.component";
import {Intervention} from "../../../../../public/models/intervention/Intervention";
import {Interventions} from "../../../../../public/shared/Interventions";
import {registerLocaleData} from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import {OrdreTravail} from "../../../../../public/models/ot/OrdreTravail";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";



@Component({
  selector: 'app-consult-interventions',
  templateUrl: './consult-interventions.component.html',
  styleUrls: ['./consult-interventions.component.scss']
})
export class ConsultInterventionsComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  interventions=new MatTableDataSource<Interventions>();
  displayedColumns: string[] = ['num_ot','type','cloturage','etat-change','settings'];
  hidded=true
  all = false
  blocked = false
  active = true
  jour!:boolean
  heure!:boolean
  minute!:boolean
  second!:boolean

  constructor(private cd :ChangeDetectorRef,private fb:FormBuilder,private interventionService:MyserviceService,private dialog:MatDialog,private concerned:ConcernedService) { }
  ngOnInit(): void {
    this.getInterventions()
    registerLocaleData(localeFr, 'fr');
    this.filter('true')
    if((this.interventions.data.filter((intervention)=>intervention.etat==false).length==0)){
      setInterval(()=>{
        this.all=(this.interventions.data.filter((intervention)=>intervention.etat==false).length==0)
      })
    }

  }

  ngAfterViewInit() {
    this.interventions.paginator = this.paginator;
    this.interventions.sort = this.sort;

  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.blocked){
      //this.getinterventions
      this.interventions.data=this.interventions.data.filter((intervention)=>intervention.etat==false)
      this.interventions.filter =filterValue.trim().toLowerCase();
    }
    else if(this.active){
      //this.getinterventions
      this.interventions.data=this.interventions.data.filter((intervention)=>intervention.etat==true)
      this.interventions.filter =filterValue.trim().toLowerCase();
    }
    else if(this.all) {
      this.getInterventions()
      this.interventions.filter = filterValue.trim().toLowerCase();

    }
  }

  getInterventions() {
    this.interventionService.Get("/interventions/tous").subscribe(data=>{
      this.interventions.data=data
    })

  }

  filter(key:string){
    this.interventions.filter = key;
  }


  AllFilter() {

    if(this.interventions.data.filter((intervention)=>intervention.etat==false).length>0){
      this.getInterventions()
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
      this.getInterventions()
      this.filter('true')
      //this.filters=[]
      //this.filters.push("Comptes actives")
      this.all = false
      this.blocked = false
      this.active = true
    }
    else {
      this.getInterventions()
      this.filter('false')
      //this.filters=[]
      //this.filters.push("Comptes desactivés")
      this.all=false
      this.blocked=true
      this.active=false
    }


  }


  openAddInterventionDialog(){
    const dialogRef = this.dialog.open(AddInterventionComponent,{autoFocus: false,panelClass: 'Steppers-dialog-container'});
    this.concerned.setDialogId(dialogRef.id)
    dialogRef.afterClosed().subscribe(()=> {
      this.getInterventions()
    })
  }


  openInterventionDetailsDialog(intervention:Intervention){
    this.interventionService.getDetails(intervention.id,"/interventions/chercherParId/").subscribe(data=>{
      this.concerned.setintervention(data)
      const dialogRef = this.dialog.open(InterventionDetailsComponent,{autoFocus: false,panelClass: 'Components-details-container'});
      this.concerned.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(()=> {
        this.getInterventions()
      })
    })

  }

  openActivationDialog(intervention:Intervention){
    let content=intervention .etat ?"Voulez vous Desactiver cette Intervention ?" : "Voulez vous Activer cettte Intervention ?"
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Interventions",content: content},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{
        if(result=="true"){
          this.activate_desactivate(intervention)
        }
        else{
          this.getInterventions()
        }
      }
    )
  }


  activate_desactivate(intervention:Intervention) {
    if (intervention.etat) {
      this.interventionService.getDetails(intervention.id, "/interventions/chercherParId/").subscribe(data => {
        intervention.etat = false
        this.interventionService.activate_desactivate(data.id, "/interventions/intervention/desactivate/").subscribe()
        this.interventions.data = this.interventions.data
      })
    } else {
      this.interventionService.getDetails(intervention.id, "/interventions/chercherParId/").subscribe(data => {
        intervention.etat = true
        this.interventionService.activate_desactivate(data.id, "/interventions/intervention/activate/").subscribe()
        this.interventions.data = this.interventions.data

      })
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
