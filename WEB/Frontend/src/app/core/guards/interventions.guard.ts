import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AccessService} from "../services/access.service";

@Injectable({
  providedIn: 'root'
})
export class InterventionsGuard implements CanActivate {
  constructor(private router:Router,private accessService:AccessService) {
  }





  canActivate():boolean {
    if(this.accessService.intervention_access)
    {

      return true
    }
    else
    {

      this.router.navigate(["/dashboard/intervenants"])
      return false
    }

  }

}
