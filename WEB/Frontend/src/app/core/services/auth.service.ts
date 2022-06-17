import { baseUrl } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../public/models/User';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenstorageService} from "./tokenstorage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user=new User()
  private  ACCESS_TOKEN="ACCESS_TOKEN"
  private REFRESH_TOKEN="REFRESH_TOKEN"

  private userSubject!: BehaviorSubject<any>;
  private myuser!: Observable<any>;

  constructor(private http:HttpClient,private jwtHelper:JwtHelperService,private tokenService:TokenstorageService) {
    this.userSubject = new BehaviorSubject<any>(null);
    this.myuser = this.userSubject.asObservable();
  }
  public get userValue(): any {
    return this.userSubject.value;
  }
  login(email:string,password:string):Observable<any>{

    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
    return this.http.post<any>(`${baseUrl}/login`, body, options)


  }

  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Bearer ${this.tokenService.getToken()}`)
  }

  GenerateRefreshToken():Observable<any>{

    return this.http.get<any>(`${baseUrl}/users/token/refresh`,this.header)
  }

  /*public handleError(error: any) {
    if (error.status === 401 || error.status === 400) {
      this.toastrService.error('Compte Introuvable ou Desactivé','',{timeOut:3000});
    }
    return throwError(error);
  }*/




  /*logout(user:User):Observable<any>{

    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('password', user.password);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
    return this.http.post<any>(`${baseUrl}/users/logout`,body,options)



  }*/













  getRefreshToken(){
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  isloggedIn(){
    return this.jwtHelper.isTokenExpired(this.tokenService.getToken()!);
  }


  getUser(){
    return this.user
  }


}
