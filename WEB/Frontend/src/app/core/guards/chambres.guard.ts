import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AccessService} from "../services/access.service";

@Injectable({
  providedIn: 'root'
})
export class ChambresGuard implements CanActivate {
  constructor(private router:Router,private accessService:AccessService) {
  }





  canActivate():boolean {
    if(this.accessService.chambres_access)
    {

      return true
    }
    else
    {

      this.router.navigate(["/dashboard/home"])
      return false
    }

  }



}
