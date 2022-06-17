import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../../../services/myservice.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Panne} from "../../../../../../public/models/Panne";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsService} from "../../../../../services/errors.service";
import {ConcernedService} from "../../../../../services/concerned.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-add-panne',
  templateUrl: './add-panne.component.html',
  styleUrls: ['./add-panne.component.scss']
})
export class AddPanneComponent implements OnInit {

  //@ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete!: MatAutocompleteTrigger;
  //@ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete1!: MatAutocompleteTrigger;
  panne =new Panne();

  isLoading=this.panneService.isLoading

  //myCtrl1 = new FormControl();
  //filteredFunctions!: Observable<string[]>;



  PannesFormGroup= new FormGroup({
    designationCtrl: new FormControl('', [Validators.required]),
  })


  constructor(private panneService: MyserviceService,private fb: FormBuilder,private toast:NgToastService,private concerned:ConcernedService,private dialog:MatDialog,readonly errorsService:ErrorsService) {

  }




  ngOnInit(): void {

  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"type de Panne",content:"Voulez vous Ajouter ce Type de Panne ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.AddPanne()
      }})
  }





  /*private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.AllRoles.filter((myvalue) =>
      myvalue.toLowerCase().includes(filterValue)
    );
  }*/



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
          this.toast.success({detail:"Types de Pannes",summary:'Panne Ajouté avec Succes',duration:2000});


        }
        else this.toast.error({detail:"Types de Pannes",summary:"Echec de l'ajout du Panne",duration:2000});
      },

    );
  }


  validateForm() {
    if(this.PannesFormGroup.invalid){
      if(this.PannesFormGroup.get("designationCtrl")?.invalid){
        this.PannesFormGroup.get("designationCtrl")?.markAllAsTouched()
      }
    }
    else{
      this.openDialog()
    }
  }

}
