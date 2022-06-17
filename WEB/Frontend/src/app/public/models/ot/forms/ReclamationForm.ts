export class ReclamationForm{
  reclamtionId!:number;
  tempsEstimeEnMinute!:number;


  constructor(reclamtionId: number, tempsEstimeEnMinute: number) {
    this.reclamtionId = reclamtionId;
    this.tempsEstimeEnMinute = tempsEstimeEnMinute;
  }
}
