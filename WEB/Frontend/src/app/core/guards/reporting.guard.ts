import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AccessService} from "../services/access.service";

@Injectable({
  providedIn: 'root'
})
export class ReportingGuard implements CanActivate {
  constructor(private router:Router,private accessService:AccessService) {
  }





  canActivate():boolean {
    return this.accessService.reporting_access;

  }

}
