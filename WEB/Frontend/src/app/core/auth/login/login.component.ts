import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MyserviceService } from '../../services/myservice.service';
import {TokenstorageService} from "../../services/tokenstorage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorsService} from "../../services/errors.service";
import {AccountsGuard} from "../../guards/accounts.guard";
import {AccessService} from "../../services/access.service";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide=true
  spinning=false

  LoginFormGroup= new FormGroup({
    emailCtrl: new FormControl('', [Validators.required,Validators.email]),
    passwordCtrl: new FormControl('', [Validators.required]),
  })
  constructor(private accessService:AccessService,private tokenService:TokenstorageService,private authService: AuthService,private router:Router,private myservice:MyserviceService,readonly errorsService:ErrorsService,private toast:NgToastService) {}

  ngOnInit(): void {


    if(!this.authService.isloggedIn()){
      this.router.navigate(['/dashboard/home'])

    }

  }



  loginUser(){
    this.spinning=true
    this.authService.login(this.LoginFormGroup.get("emailCtrl")?.value,this.LoginFormGroup.get("passwordCtrl")?.value).subscribe(data=>{

      if(data!=null){

        this.tokenService.saveToken(data.access_token)
        this.tokenService.saveRefreshToken(data.refresh_token)
        this.myservice.getUserByEmail(this.LoginFormGroup.get("emailCtrl")?.value,"/users/getuser/")
          .subscribe((data)=>{
            if(data!=null){
                this.tokenService.saveUser(data)
                this.accessService.ngOnInit()
                this.spinning=false
                this.router.navigate(['/dashboard/home'])

            }



          },



        )






      }
    },
      error=>{
        this.toast.error({detail:"Login",summary:'Email ou Mot de Passe Incorrecte',duration:2000});
        //this.LoginFormGroup.get('emailCtrl')?.setValue('')
        //this.LoginFormGroup.get('passwordCtrl')?.setValue('')
        this.LoginFormGroup.get('emailCtrl')?.setErrors({'incorrect':true})
        this.LoginFormGroup.get('passwordCtrl')?.setErrors({'incorrect':true})
        this.LoginFormGroup.markAsTouched()
        this.spinning=false
      }
    )





  }


  validateForm() {
    if(this.LoginFormGroup.invalid){

      if(this.LoginFormGroup.get("emailCtrl")?.invalid){
        this.LoginFormGroup.get("emailCtrl")?.markAllAsTouched()
      }

      if(this.LoginFormGroup.get("passwordCtrl")?.invalid){
        this.LoginFormGroup.get("passwordCtrl")?.markAllAsTouched()
      }


    }
    else{
      this.loginUser()
    }


  }


}
