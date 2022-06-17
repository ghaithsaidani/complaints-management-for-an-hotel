import {Role} from "../models/Role";

export interface Users {
  id:number;
  name:string;
  prename:string;
  email:string;
  password:string;
  tel:number;
  role_name:string
  etat:boolean
  roles:Role[]
  createdAt:Date
  updatedAt:Date
  image:string
}
