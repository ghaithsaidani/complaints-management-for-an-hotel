import { Component, OnInit } from '@angular/core';
import {ConcernedService} from "../../../../../services/concerned.service";
import {MyserviceService} from "../../../../../services/myservice.service";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsService} from "../../../../../services/errors.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Pieces} from "../../../../../../public/models/Pieces";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-afficher-details-piece',
  templateUrl: './afficher-details-piece.component.html',
  styleUrls: ['./afficher-details-piece.component.scss']
})
export class AfficherDetailsPieceComponent implements OnInit {

  piece=this.concerned.getpiece();

  constructor(private toast:NgToastService,private pieceService:MyserviceService,private concerned :ConcernedService,private dialog:MatDialog,readonly errorsService:ErrorsService) { }

  PiecesFormGroup= new FormGroup({
    designationCtrl: new FormControl(this.piece.designation, [Validators.required]),
    emplacementCtrl: new FormControl(this.piece.emplacement, [Validators.required]),
    quantiteStockCtrl: new FormControl(this.piece.quantiteStock, [Validators.required,Validators.min(1)]),
    quantiteMinimalCtrl: new FormControl(this.piece.quantiteMinimal, [Validators.required,Validators.min(1)]),
    prixUnitaireCtrl: new FormControl(this.piece.prixUnitaire, [Validators.required]),
    descriptionCtrl: new FormControl(this.piece.description),
  })
  isLoading = this.pieceService.isLoading
  ngOnInit(): void {
      this.disableAll()
  }






  onSubmit() {

    this.piece.designation=this.PiecesFormGroup.get('designationCtrl')?.value
    this.piece.description=this.PiecesFormGroup.get('descriptionCtrl')?.value
    this.piece.emplacement=this.PiecesFormGroup.get('emplacementCtrl')?.value
    this.piece.quantiteStock=this.PiecesFormGroup.get('quantiteStockCtrl')?.value
    this.piece.quantiteMinimal=this.PiecesFormGroup.get('quantiteMinimalCtrl')?.value
    this.piece.prixUnitaire=this.PiecesFormGroup.get('prixUnitaireCtrl')?.value

  }

  ModifyPiece() {
    this.isLoading.next(true)
    this.onSubmit()
    this.pieceService.Modify(this.piece,"/Pieces/modifier").subscribe(
      (data) => {
        if (data !=null)
        {
          this.isLoading.next(false)
          this.dialog.getDialogById(this.concerned.getDialogId())?.close()
          this.toast.warning({detail:"Piéces de Rechange",summary:'Piéce Modifié avec succes',duration:2000});

        }
        else this.toast.error({detail:"Piéces de Rechanges",summary:"Echec du Modification du Piéce",duration:2000});
      },

    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {data: {title: "Piéce",content: "Voulez vous Modifier cette Piéce de rechange ?"}, autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.ModifyPiece()
      }
    })
  }

  validateForm() {
    if(this.PiecesFormGroup.invalid){
      if(this.PiecesFormGroup.get("designationCtrl")?.invalid){
        this.PiecesFormGroup.get("designationCtrl")?.markAllAsTouched()
      }
      if(this.PiecesFormGroup.get("emplacementCtrl")?.invalid){
        this.PiecesFormGroup.get("emplacementCtrl")?.markAllAsTouched()
      }
      if(this.PiecesFormGroup.get("quantiteStockCtrl")?.invalid){
        this.PiecesFormGroup.get("quantiteStockCtrl")?.markAllAsTouched()
      }
      if(this.PiecesFormGroup.get("quantiteMinimalCtrl")?.invalid){
        this.PiecesFormGroup.get("quantiteMinimalCtrl")?.markAllAsTouched()
      }
      if(this.PiecesFormGroup.get("prixUnitaireCtrl")?.invalid){
        this.PiecesFormGroup.get("prixUnitaireCtrl")?.markAllAsTouched()
      }

    }
    else if(this.PiecesFormGroup.disabled){
      this.PiecesFormGroup.markAllAsTouched()
    }
    else{
      this.openDialog()
    }
  }



  activate_desactivate(piece:Pieces,etat:boolean){
    if(etat){
      this.pieceService.getDetails(piece.id,"/Pieces/chercher/").subscribe(data=> {
        piece.etat = false
        this.disableAll()
        this.pieceService.activate_desactivate(data.id, "/Pieces/piece/desactivate/").subscribe(

        )
      })
    }
    else{
      this.pieceService.getDetails(piece.id, "/Pieces/chercher/").subscribe(data => {
        piece.etat = true
        this.pieceService.activate_desactivate(data.id, "/Pieces/piece/activate/").subscribe()

      })
    }
  }

  disableAll(){
      this.PiecesFormGroup.get("designationCtrl")?.disable()
      this.PiecesFormGroup.get("emplacementCtrl")?.disable()
      this.PiecesFormGroup.get("quantiteStockCtrl")?.disable()
      this.PiecesFormGroup.get("quantiteMinimalCtrl")?.disable()
      this.PiecesFormGroup.get("prixUnitaireCtrl")?.disable()
      this.PiecesFormGroup.get("descriptionCtrl")?.disable()
  }

  toggle(list:string[]){
    for(let i=0;i<list.length;i++){
      let input = this.PiecesFormGroup.get(list[i])
      input?.disabled ? input.enable() :input?.disable()
    }
  }

  resetPiecesFormGroup(){
    this.PiecesFormGroup.reset()
    this.PiecesFormGroup.get("designationCtrl")?.enable()
    this.PiecesFormGroup.get("emplacementCtrl")?.enable()
    this.PiecesFormGroup.get("quantiteStockCtrl")?.enable()
    this.PiecesFormGroup.get("quantiteMinimalCtrl")?.enable()
    this.PiecesFormGroup.get("prixUnitaireCtrl")?.enable()
  }

  quit(){
    this.dialog.getDialogById(this.concerned.getDialogId())?.close()
  }
}
