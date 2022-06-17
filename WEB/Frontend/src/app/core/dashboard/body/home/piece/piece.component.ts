import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Piece} from "../../../../../public/shared/Piece";
import {MyserviceService} from "../../../../services/myservice.service";
import {ConcernedService} from "../../../../services/concerned.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {MatSort, Sort} from "@angular/material/sort";
import {AjouterPieceComponent} from "../../d-base/pieces/ajouter-piece/ajouter-piece.component";
import {Pieces} from "../../../../../public/models/Pieces";
import {
  AfficherDetailsPieceComponent
} from "../../d-base/pieces/afficher-details-piece/afficher-details-piece.component";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pieces= new MatTableDataSource<Piece>();
  hidded=true;
  all = false
  blocked = false
  active = true

  displayedColumns: string[] = ['designation','quantiteStock','quantiteMinimal',"etat","settings"];

  constructor(private router:Router,private pieceservice :MyserviceService,private concernedService:ConcernedService,private _liveAnnouncer: LiveAnnouncer,private dialog:MatDialog) {

  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.getPieces();
    this.filter('true')
    if((this.pieces.data.filter((piece)=>piece.etat==false).length==0)){
      setInterval(()=>{
        this.all=(this.pieces.data.filter((piece)=>piece.etat==false).length==0)
      })
    }
  }

  filter(key:string){
    this.pieces.filter = key;
  }

  public getPieces():void{
    this.pieceservice.Get("/Pieces/chargerParStock").subscribe(
      (data)=>this.pieces.data=data

    )
  }

  gotToPieces(){
    this.router.navigate(['/dashboard/d-base/pieces'])
  }

  ngAfterViewInit() {
    this.pieces.paginator = this.paginator;
    this.pieces.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.blocked){
      //this.getpieces
      this.pieces.data=this.pieces.data.filter((piece)=>piece.etat==false)
      this.pieces.filter =filterValue.trim().toLowerCase();
    }
    else if(this.active){
      //this.getpieces
      this.pieces.data=this.pieces.data.filter((piece)=>piece.etat==true)
      this.pieces.filter =filterValue.trim().toLowerCase();
    }
    else if(this.all) {
      this.getPieces()
      this.pieces.filter = filterValue.trim().toLowerCase();
    }
  }



  openPiecesDetailsDialog(piece:Pieces){
    this.pieceservice.getDetails(piece.id,"/Pieces/chercher/").subscribe(data=>{
      this.concernedService.setpiece(data)
      const dialogRef = this.dialog.open(AfficherDetailsPieceComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
      this.concernedService.setDialogId(dialogRef.id)
      dialogRef.afterClosed().subscribe(()=> {
        this.getPieces()
      })
    })

  }

  addEtatColumn() {

    if(this.displayedColumns.indexOf("etat-change")==-1 && (this.pieces.data.filter((piece)=>piece.etat==false).length>0)){
      this.displayedColumns.splice(3,0,'etat-change');
      this.getPieces()
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
      this.getPieces()
      this.filter('true')
      //this.filters=[]
      //this.filters.push("Comptes actives")
      this.all = false
      this.blocked = false
      this.active = true
    }
    else {
      this.getPieces()
      this.filter('false')
      //this.filters=[]
      //this.filters.push("Comptes desactivés")
      this.all=false
      this.blocked=true
      this.active=false
    }


  }

}
