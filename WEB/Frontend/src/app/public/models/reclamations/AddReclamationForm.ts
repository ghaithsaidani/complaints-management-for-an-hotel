export class AddReclamationForm{
  reclamationId!:number;
  panneId!:number;
  roomId!:number


  constructor(reclamationId: number, panneId: number, roomId: number) {
    this.reclamationId = reclamationId;
    this.panneId = panneId;
    this.roomId = roomId;
  }



}
