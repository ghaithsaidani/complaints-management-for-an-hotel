import {PieceForm} from "./PieceForm";

export class LigneInterventionForm {
  idReclamtionOuPrevnetif!:number;
  etat!:number;
  piece!:PieceForm[];


  constructor(idReclamtionOuPrevnetif: number, etat: number, piece?: PieceForm[]) {
    if(piece){
      this.idReclamtionOuPrevnetif = idReclamtionOuPrevnetif;
      this.etat = etat;
      this.piece = piece;
    }
    else
      this.idReclamtionOuPrevnetif = idReclamtionOuPrevnetif;
      this.etat = etat;
  }






}
