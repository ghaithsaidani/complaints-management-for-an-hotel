import { Component, OnInit } from '@angular/core';
import {ConcernedService} from "../../../../../services/concerned.service";
import {Panne} from "../../../../../../public/models/Panne";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyserviceService} from "../../../../../services/myservice.service";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsService} from "../../../../../services/errors.service";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-panne-details',
  templateUrl: './panne-details.component.html',
  styleUrls: ['./panne-details.component.scss']
})
export class PanneDetailsComponent implements OnInit {

  panne =this.concerned.getPanne();

  isLoading=this.panneService.isLoading



  PannesFormGroup= new FormGroup({
    designationCtrl: new FormControl(this.panne.designation, [Validators.required]),
  })


  constructor(private panneService: MyserviceService,private fb: FormBuilder,private toast:NgToastService,private concerned:ConcernedService,private dialog:MatDialog,readonly errorsService:ErrorsService) {

  }




  ngOnInit(): void {
    this.disableAll()
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"type de Panne",content:"Voulez vous Modifier ce Type de Panne ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.AddPanne()
      }})
  }







  onSubmit() {
    this.panne.designation=this.PannesFormGroup.get('designationCtrl')?.value
  }



  AddPanne() {
    this.isLoading.next(true)
    this.onSubmit()
    this.panneService.Add(this.panne,"/pannes/panne/save").subscribe(
      (data) => {
        if (data !=null)
        {
          this.isLoading.next(false)
          this.dialog.getDialogById(this.concerned.getDialogId())?.close()
          this.toast.warning({detail:"Types de Pannes",summary:'Panne Modifié avec succes',duration:2000});


        }
        else this.toast.error({detail:"Types de Pannes",summary:"Echec du Modification du Panne",duration:2000});
      },

    );
  }


  validateForm() {
    if(this.PannesFormGroup.invalid){
      if(this.PannesFormGroup.get("designationCtrl")?.invalid){
        //this.PannesFormGroup.get("designationCtrl")?.setErrors({'incorrect':true});
        this.PannesFormGroup.get("designationCtrl")?.markAllAsTouched()
      }
    }
    else if(this.PannesFormGroup.disabled){
      this.PannesFormGroup.markAllAsTouched()
    }
    else{
      this.openDialog()
    }
  }

  activate_desactivate(panne:Panne,etat:boolean){
    if(etat){
      this.panneService.getDetails(panne.id,"/pannes/find/").subscribe(data=> {
        panne.etat = false
        this.disableAll()
        this.panneService.activate_desactivate(data.id, "/pannes/panne/desactivate/").subscribe(

        )
      })
    }
    else{
      this.panneService.getDetails(panne.id, "/pannes/find/").subscribe(data => {
        panne.etat = true
        this.panneService.activate_desactivate(data.id, "/pannes/panne/activate/").subscribe()

      })
    }
  }

  disableAll(){
    this.PannesFormGroup.get('designationCtrl')?.disable()
  }

  toggle(list:string[]){
    for(let i=0;i<list.length;i++){
      let input = this.PannesFormGroup.get(list[i])
      input?.disabled ? input.enable() :input?.disable()
    }
  }

  resetPannesFormGroup(){
    this.PannesFormGroup.reset()
    this.PannesFormGroup.get('designationCtrl')?.enable()
  }

  quit(){
    this.dialog.getDialogById(this.concerned.getDialogId())?.close()
  }

}
