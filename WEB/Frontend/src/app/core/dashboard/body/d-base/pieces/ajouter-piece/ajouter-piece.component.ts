import { Component, OnInit } from '@angular/core';
import {Pieces} from "../../../../../../public/models/Pieces";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {ConcernedService} from "../../../../../services/concerned.service";
import {MyserviceService} from "../../../../../services/myservice.service";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsService} from "../../../../../services/errors.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-ajouter-piece',
  templateUrl: './ajouter-piece.component.html',
  styleUrls: ['./ajouter-piece.component.scss']
})
export class AjouterPieceComponent implements OnInit {

  constructor(private toast:NgToastService,private pieceService:MyserviceService,private concerned :ConcernedService,private dialog:MatDialog,readonly errorsService:ErrorsService) { }

  PiecesFormGroup= new FormGroup({
    designationCtrl: new FormControl('', [Validators.required]),
    emplacementCtrl: new FormControl('', [Validators.required]),
    quantiteStockCtrl: new FormControl('', [Validators.required,Validators.min(1)]),
    quantiteMinimalCtrl: new FormControl('', [Validators.required,Validators.min(1)]),
    prixUnitaireCtrl: new FormControl('', [Validators.required]),
    descriptionCtrl: new FormControl(''),
  })
  isLoading = this.pieceService.isLoading
  ngOnInit(): void {

  }

  private piece=new Pieces();




  onSubmit() {

    this.piece.designation=this.PiecesFormGroup.get('designationCtrl')?.value
    this.piece.description=this.PiecesFormGroup.get('descriptionCtrl')?.value
    this.piece.emplacement=this.PiecesFormGroup.get('emplacementCtrl')?.value
    this.piece.quantiteStock=this.PiecesFormGroup.get('quantiteStockCtrl')?.value
    this.piece.quantiteMinimal=this.PiecesFormGroup.get('quantiteMinimalCtrl')?.value
    this.piece.prixUnitaire=this.PiecesFormGroup.get('prixUnitaireCtrl')?.value

  }

  AddPiece() {
    this.isLoading.next(true)
    this.onSubmit()
    this.pieceService.Add(this.piece,"/Pieces/ajouter").subscribe(
      (data) => {
        if (data !=null)
        {
          this.isLoading.next(false)
          this.dialog.getDialogById(this.concerned.getDialogId())?.close()
          this.toast.success({detail:"Piéces de Rechange",summary:'Piéce Ajouté avec Succes',duration:2000});

        }
        else this.toast.error({detail:"Pieces de Rechanges",summary:"Echec de l'ajout du Piéce",duration:2000});
      },

    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {data: {title: "Piéce",content: "Voulez vous Ajouter cette Piéce de rechange ?"}, autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.AddPiece()
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
    else{
      this.openDialog()
    }
  }






}
