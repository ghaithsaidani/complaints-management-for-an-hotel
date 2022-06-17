import { Role } from "./Role";

export class User {
  id!:number;
  name!:string;
  prename!:string;
  email!:string;
  password!:string;
  tel!:number;
  etat!:boolean
  roles!:Role[]
  fonction!:string
  enrolledReclamations!:[]
  createdAt!:Date
  updatedAt!:Date
  image!:string

}
