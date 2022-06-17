import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccessService } from '../services/access.service';

@Injectable({
  providedIn: 'root'
})
export class EquipementsGuard implements CanActivate {

  constructor(private access:AccessService,private router:Router) {

  }
  canActivate():boolean {
    if(this.access.equipement_access)
    {
      return true
    }
    else
    {
      this.router.navigate(["/dashboard/d-base/pannes"])
      return false
    }

  }
}
