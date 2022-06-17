import {Component, OnInit, ViewChild} from '@angular/core';
import { MyserviceService } from '../../../../services/myservice.service';
import {ConcernedService} from "../../../../services/concerned.service";
import {User} from "../../../../../public/models/User";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsService} from "../../../../services/errors.service";
import {map, startWith} from "rxjs/operators";
import {EmailtoNameForm} from "../../../../../public/models/Forms/EmailtoNameForm";
import {HttpResponse} from "@angular/common/http";
import {TokenstorageService} from "../../../../services/tokenstorage.service";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.scss']
})
export class AccountdetailsComponent implements OnInit {




  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete!: MatAutocompleteTrigger;
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete1!: MatAutocompleteTrigger;

  hide = true;
  hide_confirm = true;
  user =new User();
  myuser=this.concernedUser.getuser()
  isLoading=this.accountService.isLoading

  myCtrl1 = new FormControl();
  filteredFunctions!: Observable<string[]>;

  AllRoles:string[]=[]

  UserFormGroup= new FormGroup({
    nameCtrl: new FormControl(this.myuser.name, [Validators.required]),
    prenameCtrl: new FormControl(this.myuser.prename, [Validators.required]),
    fonctionCtrl: new FormControl(this.myuser.fonction, [Validators.required]),
    emailCtrl: new FormControl(this.myuser.email, [Validators.required,Validators.email]),
    telCtrl: new FormControl(this.myuser.tel, [Validators.required,Validators.maxLength(8),Validators.minLength(8)]),
    passwordCtrl: new FormControl(this.myuser.password, [Validators.required]),
    confirmpasswordCtrl: new FormControl(this.myuser.password, [Validators.required]),
  })

  selected = this.UserFormGroup.get('fonctionCtrl')?.value;











  constructor(private accountService: MyserviceService,private fb: FormBuilder,private toast:NgToastService,readonly tokenStrorage:TokenstorageService,readonly concernedUser:ConcernedService,private dialog:MatDialog,readonly errorsService:ErrorsService) { }


  ngOnInit(): void {
    this.accountService.Get("/users/roles").subscribe(data=>{
      data.map(role=>{
        this.AllRoles.push(role.name)
      })
    })

    this.disableAll()
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.user.id=this.myuser.id
    this.user.name=this.UserFormGroup.get("nameCtrl")?.value
    this.user.prename=this.UserFormGroup.get("prenameCtrl")?.value
    this.user.fonction=this.UserFormGroup.get("fonctionCtrl")?.value
    this.user.roles=this.myuser.roles
    //this.user.etat=this.myuser.etat
    this.user.email=this.UserFormGroup.get("emailCtrl")?.value
    this.user.tel=this.UserFormGroup.get("telCtrl")?.value
    this.user.password=this.UserFormGroup.get("passwordCtrl")?.value
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.AllRoles.filter((myvalue) =>
      myvalue.toLowerCase().includes(filterValue)
    );
  }

  getroles(){
    this.filteredFunctions = this.myCtrl1.valueChanges.pipe(
      startWith(''),
      map((myfunction: string | null) =>
        myfunction ? this._filter(myfunction) : this.AllRoles.slice(),

      )
    );

  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Comptes",content:"Voulez vous Modifier cette Compte ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.ModifyUser()
      }})
  }


  ModifyUser() {

    this.accountService.isLoading.next(true)
    this.onSubmit()
    this.accountService.Modify(this.user,"/users/update").subscribe(
      (data) => {

        if (data !=null)
        {

          this.accountService.enroll(new EmailtoNameForm(data.email,this.UserFormGroup.get("fonctionCtrl")?.value),"/users/role/addtouser").subscribe(()=>{
              if(HttpResponse){
                this.accountService.isLoading.next(false)
                this.toast.warning({detail:"Comptes",summary:'Compte Modifié avec succes',duration:2000});
                //this.toastrService.success('Compte Modifié avec succes','',{timeOut:3000});
                this.dialog.getDialogById(this.concernedUser.getDialogId())?.close()
              }
            }

          )
        }
        else this.toast.error({detail:"Comptes",summary:'Echec du Modification du compte',duration:2000});
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
      if(this.UserFormGroup.get("confirmpasswordCtrl")?.invalid){
        this.UserFormGroup.get("confirmpasswordCtrl")?.markAllAsTouched()
      }

    }
    else if(this.UserFormGroup.disabled){
      this.UserFormGroup.markAllAsTouched()
    }
    else{
      this.openDialog()
    }


  }

  disableAll(){
    this.UserFormGroup.get('nameCtrl')?.disable()
    this.UserFormGroup.get('prenameCtrl')?.disable()
    this.UserFormGroup.get('fonctionCtrl')?.disable()
    this.UserFormGroup.get('passwordCtrl')?.disable()
    this.UserFormGroup.get('telCtrl')?.disable()
    this.UserFormGroup.get('confirmpasswordCtrl')?.disable()
    this.UserFormGroup.get('emailCtrl')?.disable()
  }



  toggle(list:string[]){
    for(let i=0;i<list.length;i++){
      let input = this.UserFormGroup.get(list[i])
      input?.disabled ? input.enable() :input?.disable()
    }
  }

  resetUserFormGroup(){
    this.UserFormGroup.reset()
    this.UserFormGroup.get('nameCtrl')?.enable()
    this.UserFormGroup.get('prenameCtrl')?.enable()
    this.UserFormGroup.get('fonctionCtrl')?.enable()
    this.UserFormGroup.get('passwordCtrl')?.enable()
    this.UserFormGroup.get('telCtrl')?.enable()
    this.UserFormGroup.get('confirmpasswordCtrl')?.enable()
    this.UserFormGroup.get('emailCtrl')?.enable()
  }

  quit(){
    this.dialog.getDialogById(this.concernedUser.getDialogId())?.close()
  }

}
