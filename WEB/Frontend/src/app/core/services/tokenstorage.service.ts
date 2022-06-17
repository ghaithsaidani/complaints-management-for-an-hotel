import { Injectable } from '@angular/core';
import {AccessService} from "./access.service";

const ACCESSTOKEN_KEY = 'ACCESS_TOKEN';
const REFRESHTOKEN_KEY = 'REFRESH_TOKEN';
const USER_KEY = 'CURRENT_USER';

@Injectable({
  providedIn: 'root'
})
export class TokenstorageService {

  constructor() { }
  signOut(): void {
    localStorage.clear();
    //this.accessService.deleteAllaccess()
  }
  public saveToken(token: string): void {
    localStorage.removeItem(ACCESSTOKEN_KEY);
    localStorage.setItem(ACCESSTOKEN_KEY, token);

  }
  public getToken(): string | null {
    return localStorage.getItem(ACCESSTOKEN_KEY);
  }
  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token);
  }
  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }
  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(){
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
