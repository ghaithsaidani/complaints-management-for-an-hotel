import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {baseUrl} from "../../../environments/environment";
import {TokenstorageService} from "./tokenstorage.service";


@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http:HttpClient,private tokenService:TokenstorageService) {
  }

  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
  }



  getIntervenantsParOt():Observable<any>{
    return this.http.get(`${baseUrl}/intervenants/intervenantparot`,this.header)
  }

  getNb_Reclamations_Par_Reclameur():Observable<any>{
    return this.http.get(`${baseUrl}/users/nbreclamations`,this.header)
  }

  GetReclamationBetweenGroupedByDay(firstDate:any,secondDate:any):Observable<any>{
    return this.http.get<any[]>(`${baseUrl}/reclamations/ReclamationsGroupedByDay?firstDate=`+firstDate+"&secondDate="+secondDate)
  }

  GetReclamationBetweenGroupedByMonth(firstDate:any,secondDate:any):Observable<any>{
    return this.http.get<any[]>(`${baseUrl}/reclamations/ReclamationsGroupedByMonth?firstDate=`+firstDate+"&secondDate="+secondDate)
  }

  GetReclamationBetweenGroupedByYear(firstDate:any,secondDate:any):Observable<any>{
    return this.http.get<any[]>(`${baseUrl}/reclamations/ReclamationsGroupedByYear?firstDate=`+firstDate+"&secondDate="+secondDate)
  }

  GetDisponibilite():Observable<any>{
    return this.http.get(`${baseUrl}/equipements/disponibilites`,this.header)
  }

  Panne_Plus_Repete():Observable<any>{
    return this.http.get(`${baseUrl}/pannes/plus_repete`,this.header)
  }


}
