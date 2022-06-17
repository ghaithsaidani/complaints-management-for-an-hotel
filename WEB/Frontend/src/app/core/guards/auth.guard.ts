import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {TokenstorageService} from "../services/tokenstorage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



    constructor(private authService:AuthService,private router:Router,private tokenService:TokenstorageService) {

    }

    canActivate():boolean {
      if(!this.authService.isloggedIn())
      {
        return true
      }
      else
      {
        this.tokenService.signOut()
        this.router.navigate(['/auth/login'])
        return false
      }
    }



}
