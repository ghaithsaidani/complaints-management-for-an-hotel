import { Component, OnInit } from '@angular/core';
import {Piece} from "../../../../../../public/shared/Piece";
import {ConcernedService} from "../../../../../services/concerned.service";
import {Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource} from "@angular/material/table";
import {Pieces} from "../../../../../../public/models/Pieces";
import {MyserviceService} from "../../../../../services/myservice.service";
import {MatDialog} from "@angular/material/dialog";
import {AfficherDetailsPieceComponent} from "../afficher-details-piece/afficher-details-piece.component";
import {AjouterPieceComponent} from "../ajouter-piece/ajouter-piece.component";

@Component({
  selector: 'app-afficher-liste-pieces',
  templateUrl: './afficher-liste-pieces.component.html',
  styleUrls: ['./afficher-liste-pieces.component.scss']
})
export class AfficherListePiecesComponent implements OnInit {
  pieces= new MatTableDataSource<Piece>();
  hidded=true;
  all = false
  blocked = false
  active = true

  displayedColumns: string[] = ['designation','quantiteStock','prixUnitaire',"settings"];

  constructor(private pieceservice :MyserviceService,private concernedService:ConcernedService,private _liveAnnouncer: LiveAnnouncer,private dialog:MatDialog) {

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
   this.pieceservice.Get("/Pieces/tous").subscribe(
     (data)=>this.pieces.data=data

    )
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

  openAddPiecesDialog(){
    const dialogRef = this.dialog.open(AjouterPieceComponent,{autoFocus: false,panelClass: 'Components-dialog-container'});
    this.concernedService.setDialogId(dialogRef.id)
    dialogRef.afterClosed().subscribe(()=> {
      this.getPieces()
    })
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
