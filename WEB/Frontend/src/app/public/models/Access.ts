export class Access{
  consult!:boolean
  add!:boolean
  modify!:boolean
  getdetails!:boolean


  constructor(consult: boolean, add: boolean, modify: boolean, getdetails: boolean) {
    this.consult = consult;
    this.add = add;
    this.modify = modify;
    this.getdetails = getdetails;
  }



}
