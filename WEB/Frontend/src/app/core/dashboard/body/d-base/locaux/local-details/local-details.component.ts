import { Component, OnInit } from '@angular/core';
import {ConcernedService} from "../../../../../services/concerned.service";
import {Local} from "../../../../../../public/models/Local";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyserviceService} from "../../../../../services/myservice.service";
import {ErrorsService} from "../../../../../services/errors.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";
import {AccessService} from "../../../../../services/access.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-local-details',
  templateUrl: './local-details.component.html',
  styleUrls: ['./local-details.component.scss']
})
export class LocalDetailsComponent implements OnInit {

  //@ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete!: MatAutocompleteTrigger;
  //@ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete1!: MatAutocompleteTrigger;
  keyword:any=''
  isLoading=this.localService.isLoading
  local=this.concerned.getlocal()

  //myCtrl1 = new FormControl();
  //filteredFunctions!: Observable<string[]>;




  LocalFormGroup= new FormGroup({
    parentCtrl: new FormControl(this.local.parent, [Validators.required]),
    descriptionCtrl: new FormControl(this.local.description, [Validators.required]),
  })


  constructor(private localService: MyserviceService,private fb: FormBuilder,private toast:NgToastService,readonly errorsService:ErrorsService,private dialog:MatDialog,private concerned:ConcernedService,readonly accessService:AccessService) {

  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Local",content:"Voulez vous Modifier cet Local ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.ModifyLocal()
      }})
  }

  /*openSnackBar() {
    this._snackBar.openFromComponent(AddedSnackbarComponent, {
      duration: 5 * 1000,
      horizontalPosition:"end",
      verticalPosition:"top"
    });
  }*/




  ngOnInit(): void {
    setInterval(()=>{this.isLoading=this.localService.isLoading})
    this.disableAll()

  }





  /*private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.AllRoles.filter((myvalue) =>
      myvalue.toLowerCase().includes(filterValue)
    );
  }*/



  onSubmit() {
    this.local.parent=this.LocalFormGroup.get('parentCtrl')?.value
    this.local.description=this.LocalFormGroup.get('descriptionCtrl')?.value
  }



  ModifyLocal() {
    this.localService.isLoading.next(true)
    this.onSubmit()
    this.localService.Modify(this.local,"/locaux/update").subscribe(
      (data) => {
        if (data !=null)
        {

          this.localService.isLoading.next(false)
          this.dialog.getDialogById(this.concerned.getDialogId())?.close()
          this.toast.warning({detail:"Locaux",summary:'Local Modifié avec succes',duration:2000});

        }
        else this.toast.error({detail:"Locaux",summary:"Echec du Modification du Local",duration:2000});
      },

    );
  }


  validateForm() {
    if(this.LocalFormGroup.invalid){
      if(this.LocalFormGroup.get("parentCtrl")?.invalid){
        this.LocalFormGroup.get("parentCtrl")?.markAllAsTouched()
      }
      if(this.LocalFormGroup.get("descriptionCtrl")?.invalid){
        this.LocalFormGroup.get("descriptionCtrl")?.markAllAsTouched()
      }

    }
    else if(this.LocalFormGroup.disabled){
      this.LocalFormGroup.markAllAsTouched()
    }
    else{
      this.openDialog()
    }
  }




  disableAll(){
    this.LocalFormGroup.get('parentCtrl')?.disable()
    this.LocalFormGroup.get('descriptionCtrl')?.disable()
  }

  toggle(list:string[]){
    for(let i=0;i<list.length;i++){
      let input = this.LocalFormGroup.get(list[i])
      input?.disabled ? input.enable() :input?.disable()
    }
  }

  resetLocalFormGroup(){
    this.LocalFormGroup.reset()
    this.LocalFormGroup.get('parentCtrl')?.enable()
    this.LocalFormGroup.get('descriptionCtrl')?.enable()
  }

  quit(){
    this.dialog.getDialogById(this.concerned.getDialogId())?.close()
  }

}
