import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MyserviceService} from "../../../../services/myservice.service";
import {MatDialog} from "@angular/material/dialog";
import {ConcernedService} from "../../../../services/concerned.service";
import {AddOtComponent} from "../../ot/add-ot/add-ot.component";
import {OrdreTravail} from "../../../../../public/models/ot/OrdreTravail";
import {OtDetailsComponent} from "../../ot/ot-details/ot-details.component";
import {OtReclamationEquipements, OtReclamationPannes} from "../../../../../public/shared/Ots";
import * as moment from "moment";
import {LigneOtPanne} from "../../../../../public/models/ot/lignes/LigneOtPanne";
import {LigneOtEquipement} from "../../../../../public/models/ot/lignes/LigneOtEquipement";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-oth',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.scss']
})
export class OTComponent implements OnInit {


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Ot = new MatTableDataSource<any>();
  /*ot:any*/
  displayedColumns: string[] = ['num_ot', 'type_ot', 'temps','tempsEcoule','etat', 'settings'];
  hidded = true
  all = false
  blocked = false
  active = true
  jour!: boolean
  heure!: boolean
  minute!: boolean
  second!: boolean

  constructor(private cd: ChangeDetectorRef, private OtService: MyserviceService, private dialog: MatDialog, private concerned: ConcernedService,private router:Router) {

  }

  gotToOt(){
    this.router.navigate(['/dashboard/ot'])
  }

  ngOnInit(): void {

    this.getOt()
    this.filter('true')
    if ((this.Ot.data.filter((ot) => ot.etat == false).length == 0)) {
      setInterval(() => {
        this.all = (this.Ot.data.filter((ot) => ot.etat == false).length == 0)
      })
    }

    //console.log(this.Ot.data[1].reclamationsEquipement[0])
  }

  ngAfterViewInit() {
    this.Ot.paginator = this.paginator;
    this.Ot.sort = this.sort;
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges()
  }

  filter(key: string) {
    this.Ot.filter = key;
  }


  getOt() {

    this.OtService.Get("/Ot/enCours").subscribe(data => {
      this.Ot.data = data

    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.blocked) {
      //this.getreclamations
      this.Ot.data = this.Ot.data.filter((ot) => ot.etat == false)
      this.Ot.filter = filterValue.trim().toLowerCase();
    } else if (this.active) {
      //this.getOt
      this.Ot.data = this.Ot.data.filter((ot) => ot.etat == true)
      this.Ot.filter = filterValue.trim().toLowerCase();
    } else if (this.all) {
      this.getOt()
      this.Ot.filter = filterValue.trim().toLowerCase();

    }
  }

  openAddOtDialog() {
    const dialogRef = this.dialog.open(AddOtComponent, {autoFocus: false, panelClass: 'Steppers-dialog-container'});
    this.concerned.setDialogId(dialogRef.id)
    dialogRef.afterClosed().subscribe(() => {
      this.getOt()
    })
  }


  openOtDetailsDialog(ot: OrdreTravail) {
    this.OtService.getDetails(ot.id, "/Ot/chercherParId/").subscribe(data => {
      this.concerned.setot(data)
      const dialogRef = this.dialog.open(OtDetailsComponent, {
        autoFocus: false,
        panelClass: 'Components-details-container'
      });
      this.concerned.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(() => {
        this.getOt()
      })
    })

  }


  InstanceofOtEquipement(element: OtReclamationEquipements) {
    return element.reclamationsEquipement != null
  }

  InstanceofOtPanne(element: OtReclamationPannes) {
    return element.reclamationsPannes != null
  }

  TempsEstime(element: any) {
    let periodsum = moment.duration(0)
    if (this.InstanceofOtPanne(element)) {
      element.reclamationsPannes.map((ligneOt: LigneOtPanne) => {
        periodsum.add(ligneOt.tempsEstime)
      })
      if (moment.duration(periodsum, 'minutes').hours() == 0) {
        return moment.duration(periodsum, 'minutes').minutes() + " minutes";
      }
      return moment.duration(periodsum, 'minutes').hours() + " heures " + moment.duration(periodsum, 'minutes').minutes() + " minutes"
    } else if (this.InstanceofOtEquipement(element)) {
      element.reclamationsEquipement.map((ligneOt: LigneOtEquipement) => {
        periodsum.add(ligneOt.tempsEstime)
      })
      if (moment.duration(periodsum, 'minutes').hours() == 0) {
        return moment.duration(periodsum, 'minutes').minutes() + " minutes";
      }
      return moment.duration(periodsum, 'minutes').hours() + " heures " + moment.duration(periodsum, 'minutes').minutes() + " minutes"
    } else return null


  }


  AllFilter() {

    if (this.Ot.data.filter((reclamation) => reclamation.etat == false).length > 0) {
      this.getOt()
      //this.filters=[]
      //this.filters.push("Tous les comptes")
      this.filter('')
      this.all = true
      this.blocked = false
      this.active = false
    }

  }

  OtherFilters(etat: boolean) {
    if (etat) {
      this.getOt()
      this.filter('true')

      this.all = false
      this.blocked = false
      this.active = true
    } else {
      this.getOt()
      this.filter('false')
      this.all = false
      this.blocked = true
      this.active = false
    }


  }


  calculateDiff(data: Date) {
    let date = new Date(data);
    let currentDate = new Date();
    if (Math.floor((currentDate.getTime() - date.getTime())) / 1000 < 60) {
      this.jour = false
      this.heure = false
      this.minute = false
      this.second = true
      return parseInt(String(Math.floor(currentDate.getTime() - date.getTime()) / (1000)).split('.')[0])
    } else if (Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60)) < 60) {
      this.jour = false
      this.heure = false
      this.minute = true
      this.second = false
      return Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60))
    }

    if (Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60)) < 24) {
      this.jour = false
      this.heure = true
      this.minute = false
      this.second = false
      return Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60))
    } else {
      this.jour = true
      this.heure = false
      this.minute = false
      this.second = false
      return Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    }

  }


  openDialog(ot: OrdreTravail) {
    let content = ot.etat ? "Voulez vous Desactiver cette Ordre de Travail ?" : "Voulez vous Activer cette Ordre de Travail ?"
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: "Ordres de Travail", content: content},
      autoFocus: false,
      panelClass: 'choice-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result == "true") {
          this.activate_desactivate(ot)
        } else {
          this.getOt()
        }
      }
    )
  }


  activate_desactivate(ot: OrdreTravail) {
    if (ot.etat) {
      this.OtService.getDetails(ot.id, "/Ot/chercherParId/").subscribe(data => {
        ot.etat = false
        this.OtService.activate_desactivate(data.id, "/Ot/ot/desactivate/").subscribe()
        this.Ot.data = this.Ot.data
      })
    } else {
      this.OtService.getDetails(ot.id, "/Ot/chercherParId/").subscribe(data => {
        ot.etat = true
        this.OtService.activate_desactivate(data.id, "/Ot/ot/activate/").subscribe()
        this.Ot.data = this.Ot.data

      })
    }
  }


}
