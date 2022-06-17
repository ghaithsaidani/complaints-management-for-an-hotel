import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import {AuthService} from "./auth.service";
import {TokenstorageService} from "./tokenstorage.service";
import {AccessService} from "./access.service";
import {User} from "../../public/models/User";

const httpOptions = {
  responseType : 'arraybuffer' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {


  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)


  private nomgestion:string = "acceuil"

  public getnomgestion(): string {
    return this.nomgestion;
  }

  public setnomgestion(value: string) {
    this.nomgestion = value;
  }


  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
  }


  constructor(private http:HttpClient,private authService:AuthService,private tokenService:TokenstorageService,private access:AccessService) { }

  Get(gestionApi:string):Observable<any[]>{

    return this.http.get<any[]>(`${baseUrl}`+gestionApi,this.header)
  }



  getUserByEmail(email:string,gestionApi:string):Observable<User>{
    return this.http.get<User>(`${baseUrl}${gestionApi}${email}`,this.header)
  }

  GetFiltered(filterkey:string,filterkeyword:string):Observable<any[]>{
    return this.http.get<any[]>(`${baseUrl}/users/get_filtered_accounts?filterkey=+${filterkey}+"&keyword="+${filterkeyword}`)
  }


  Add(added:any,gestionApi:string):Observable<any>{
    return this.http.post<any>(`${baseUrl}`+gestionApi,added,this.header)
  }

  getDetails(id:number,gestionApi:string):Observable<any>{

    return this.http.get<any>(`${baseUrl}`+gestionApi+id.toString(),this.header);
  }

  Modify(modified:any,gestionApi:string):Observable<any>{
    return this.http.put<any>(`${baseUrl}`+gestionApi,modified,this.header)
  }

  activate_desactivate(id:number,gestionApi:string):Observable<any>{
    return this.http.put<any>(`${baseUrl}`+gestionApi+id.toString(),this.header)
  }

  enroll(form:any,gestionApi:string):Observable<any>{
    return this.http.post<any>(`${baseUrl}`+gestionApi,form)
  }

  deleteUserRoles(id:number):Observable<any>{
    return this.http.post<any>(`${baseUrl}/users/deleteuserroles/`+id.toString(),this.header)
  }


  exportPdfOt(id:number){
    return this.http.post<any>(`${baseUrl}/Ot/getPdf/`+id.toString(),this.header, httpOptions);
  }


  /*giveAccess(){
    switch (this.tokenService.getUser().fonction) {
      case "ADMINISTRATEUR":
        this.access.giveAdminAccess()
        break;
      case "UTILISATEUR":
        this.access.giveUserAccess()
        break
      case "GOUVERNANTE":
        this.access.giveUserAccess()
        break
      default:
        break;
    }
    /!*console.log(this.acess.accounts_access)
    console.log(this.acess.equipement_access)
    console.log(this.acess.locals_access)
    console.log(this.acess.panne_access)*!/

  }*/






}
