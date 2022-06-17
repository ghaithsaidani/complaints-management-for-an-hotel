import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseUrl} from "../../../environments/environment";
import {TokenstorageService} from "./tokenstorage.service";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http:HttpClient,private tokenService:TokenstorageService) { }


  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
  }



  getReclamationsCount():Observable<any>{
    return this.http.get(`${baseUrl}/reclamations/count`,this.header)
  }

  getReclamationsNonTraite():Observable<any>{
    return this.http.get(`${baseUrl}/reclamations/count_non_traite`,this.header)
  }

  getOtEnCours():Observable<any>{
    return this.http.get(`${baseUrl}/Ot/count_en_cours`,this.header)
  }



  getReclamationsUserCount(id:number):Observable<any>{
    return this.http.get(`${baseUrl}/users/reclamationscount?id=${id}`,this.header)
  }

  getAverageDispo():Observable<any>{
    return this.http.get(`${baseUrl}/equipements/avgdispo`,this.header)
  }


}
