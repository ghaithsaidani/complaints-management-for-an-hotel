import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { User } from '../../../../../public/models/User';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MyserviceService } from '../../../../services/myservice.service';
import {HttpResponse} from "@angular/common/http";
import {EmailtoNameForm} from "../../../../../public/models/Forms/EmailtoNameForm";
import {MatDialog} from "@angular/material/dialog";
import {ConcernedService} from "../../../../services/concerned.service";
import {ErrorsService} from "../../../../services/errors.service";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete!: MatAutocompleteTrigger;
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete1!: MatAutocompleteTrigger;

  hide = true;
  hide_confirm = true;
  user =new User();
  myuser!:User
  keyword:any=''
  roles:string[]=[]
  isLoading=this.accountService.isLoading

  myCtrl1 = new FormControl();
  filteredFunctions!: Observable<string[]>;
  users:User[]=[]

  AllRoles:string[]=[]


  UserFormGroup= new FormGroup({
    nameCtrl: new FormControl('', [Validators.required]),
    prenameCtrl: new FormControl('', [Validators.required]),
    fonctionCtrl: new FormControl('', [Validators.required]),
    emailCtrl: new FormControl('', [Validators.required,Validators.email,this.validateEmail.bind(this)]),
    telCtrl: new FormControl('', [Validators.required,Validators.maxLength(8),Validators.minLength(8)]),
    passwordCtrl: new FormControl('', [Validators.required]),
    confirmpasswordCtrl: new FormControl('', [Validators.required,this.validateConfirmPassword.bind(this)]),
  })




  constructor(private accountService: MyserviceService,private fb: FormBuilder,private toast:NgToastService,public dialog: MatDialog,private concerned:ConcernedService,readonly errorsService:ErrorsService) {

  }

  validateEmail(control: AbstractControl) : {[key: string]: any} | null {
    let emails=this.users.map((user)=>user.email)
    if (control.value && emails.indexOf(control.value)!=-1) {
      return {'EmailExist': true};
    }
    return null;
  }
  get password():FormControl{
    return this.UserFormGroup.get('passwordCtrl') as FormControl
  }

  validateConfirmPassword(control: AbstractControl) : {[key: string]: any} | null {

    if (control.value && control.value!=this.password.value) {
      return {'confirm': true};
    }
    return null;
  }



  getUsers(){
    this.accountService.Get("/users/all").subscribe(data=>{
      this.users=data
    })
  }

  getUser(email:string){
    this.accountService.getUserByEmail(email,"/users/getuser/").subscribe(data=>{
      this.myuser=data
    })

  }


  ngOnInit(): void {
    this.getUsers()




    this.accountService.Get("/users/roles").subscribe(data=>{
      data.map(role=>{
        this.AllRoles.push(role.name)
      })
    })

    /*for(let i=0;i<this.roles.length;i++){
      localStorage.setItem("role"+i,this.roles[i].name)
    }*/

    setInterval(()=>{this.isLoading=this.accountService.isLoading})

  }
  getroles(){
    this.filteredFunctions = this.myCtrl1.valueChanges.pipe(
      startWith(''),
      map((myfunction: string | null) =>
        myfunction ? this._filter(myfunction) : this.AllRoles.slice(),

      )
    );

  }




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.AllRoles.filter((myvalue) =>
      myvalue.toLowerCase().includes(filterValue)
    );
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Comptes",content:"Voulez vous Ajouter cette Compte ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{
      if(result=="true"){
        this.AddUser()
      }})



  }

  AddUser(){

      this.accountService.isLoading.next(true)
      this.onSubmit()
      this.accountService.Add(this.user,"/users/user/save").subscribe(
        (data) => {
          if (data !=null)
          {

            this.accountService.enroll(new EmailtoNameForm(data.email,this.UserFormGroup.get('fonctionCtrl')?.value),"/users/role/addtouser").subscribe(()=>{
                if(HttpResponse){
                  this.accountService.isLoading.next(false)
                  this.toast.success({detail:"Comptes",summary:'Compte Ajouté avec Succes',duration:2000});
                  this.dialog.getDialogById(this.concerned.getDialogId())?.close()
                  //this.pagesService.setAccountpage(ConsultAccountsComponent)
                }
              }
            )





          }
          else this.toast.error({detail:"Comptes",summary:"Echec de l'ajout du compte",duration:2000});
        },

      );
  }



  validateForm() {
    if(this.UserFormGroup.invalid){
      if(this.UserFormGroup.get("nameCtrl")?.invalid){
        this.UserFormGroup.get("nameCtrl")?.markAllAsTouched()
      }
      if(this.UserFormGroup.get("prenameCtrl")?.invalid){
        this.UserFormGroup.get("prenameCtrl")?.markAllAsTouched()
      }
      if(this.UserFormGroup.get("fonctionCtrl")?.invalid){
        this.UserFormGroup.get("fonctionCtrl")?.markAllAsTouched()
      }
      if(this.UserFormGroup.get("emailCtrl")?.invalid){
        this.UserFormGroup.get("emailCtrl")?.markAllAsTouched()
      }

      if(this.UserFormGroup.get("telCtrl")?.invalid){

        this.UserFormGroup.get("telCtrl")?.markAllAsTouched()
      }
      if(this.UserFormGroup.get("passwordCtrl")?.invalid){
        this.UserFormGroup.get("passwordCtrl")?.markAllAsTouched()
      }
      if(this.UserFormGroup.get("confirmpasswordCtrl")?.getError('confirm')){
        this.UserFormGroup.get("confirmpasswordCtrl")?.markAllAsTouched()
      }
    }
    else{
      this.openDialog()
    }
  }



  onSubmit() {

    this.user.name=this.UserFormGroup.get("nameCtrl")?.value
    this.user.prename=this.UserFormGroup.get("prenameCtrl")?.value
    //this.user.fonction=this.UserFormGroup.get("fonctionCtrl")?.value
    //this.user.roles=this.myuser.roles
    //this.user.etat=this.myuser.etat
    this.user.email=this.UserFormGroup.get("emailCtrl")?.value
    this.user.tel=this.UserFormGroup.get("telCtrl")?.value
    this.user.password=this.UserFormGroup.get("passwordCtrl")?.value
  }

}






