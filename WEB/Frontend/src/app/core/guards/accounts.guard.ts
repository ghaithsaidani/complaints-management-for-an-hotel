import {Injectable, Input} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AccessService} from "../services/access.service";




@Injectable({
  providedIn: 'any'
})
export class AccountsGuard implements CanActivate{



  constructor(private router:Router,private access:AccessService) {
  }





  canActivate():boolean {
    if(this.access.accounts_access)
    {

      return true
    }
    else
    {

      this.router.navigate(["/dashboard/reclamations"])
      return false
    }

  }







}
