import { Component, OnInit } from '@angular/core';
import {Equipement} from "../../../../../../public/models/Equipement";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MyserviceService} from "../../../../../services/myservice.service";
import {ErrorsService} from "../../../../../services/errors.service";
import {ConcernedService} from "../../../../../services/concerned.service";
import {Locaux} from "../../../../../../public/shared/Locaux";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";
import {AccessService} from "../../../../../services/access.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-equipementdetails',
  templateUrl: './equipementdetails.component.html',
  styleUrls: ['./equipementdetails.component.scss']
})
export class EquipementdetailsComponent implements OnInit {

  equipement = this.concerned.getequipement();
  keyword: any = ''
  startDate = new Date();
  isLoading = this.equipementService.isLoading
  locals:Locaux[]=[]

  //myCtrl1 = new FormControl();
  //filteredFunctions!: Observable<string[]>;

  EquipementFormGroup= new FormGroup({
    designationCtrl: new FormControl(this.equipement.designation, [Validators.required]),
    numSerieCtrl: new FormControl(this.equipement.numSerie, [Validators.required]),
    familleCtrl: new FormControl(this.equipement.famille, [Validators.required]),
    dateachatCtrl: new FormControl(this.equipement.dateachat, [Validators.required]),
    dateexploitCtrl: new FormControl(this.equipement.dateexploi, [Validators.required]),
    periodiciteCtrl: new FormControl(this.equipement.periodicite_maintenance, [Validators.required]),
    localCtrl: new FormControl(this.equipement.local, [Validators.required]),
    descriptionCtrl: new FormControl(this.equipement.description, [Validators.required]),
  })


  //selected=this.EquipementFormGroup.get('localCtrl')?.value

  constructor(private equipementService: MyserviceService, private fb: FormBuilder, private toast: NgToastService, private dialog: MatDialog,readonly errorsService:ErrorsService,private concerned:ConcernedService,readonly accessService:AccessService) {}
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {data: {title: "Equipement",content: "Voulez vous Modifier cette Equipements ?"}, autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.ModifyEquipement()
      }
    })
  }


  ngOnInit(): void {
    this.getLocals()
    setInterval(() => {
      this.isLoading = this.equipementService.isLoading
    })
    this.disableAll()
  }

  getLocals(){
    this.equipementService.Get("/locaux/all").subscribe(data=>{
      this.locals=data
    })
  }





  ModifyEquipement() {
    this.equipementService.isLoading.next(true)
    this.onSubmit()
    this.equipementService.Modify(this.equipement, "/equipements/update").subscribe(
      (data) => {
        if (data != null) {
          this.isLoading.next(false)
          this.dialog.getDialogById(this.concerned.getDialogId())?.close()
          this.toast.warning({detail:"Equipements",summary:'Equipement Modifié avec succes',duration:2000});
          /*this.equipementService.enroll(new IDtoIDForm(this.EquipementFormGroup.get("localCtrl")?.value.id,data.id),"/locaux/equipement/addequipement").subscribe(()=>{
            if(HttpResponse){

            }
          })*/
        } else this.toast.error({detail:"Equipements",summary:"Echec du Modification de l'Equipement",duration:2000});
      },
    );
  }
  onSubmit() {
    this.equipement.designation = this.EquipementFormGroup.get('designationCtrl')?.value
    this.equipement.numSerie = this.EquipementFormGroup.get('numSerieCtrl')?.value
    this.equipement.famille = this.EquipementFormGroup.get('familleCtrl')?.value
    this.equipement.dateachat = this.EquipementFormGroup.get('dateachatCtrl')?.value
    this.equipement.dateexploi = this.EquipementFormGroup.get('dateexploitCtrl')?.value
    this.equipement.periodicite_maintenance = this.EquipementFormGroup.get('periodiciteCtrl')?.value
    this.equipement.description = this.EquipementFormGroup.get('descriptionCtrl')?.value
    this.equipement.local=this.EquipementFormGroup.get("localCtrl")?.value
  }


  validateForm() {
    if(this.EquipementFormGroup.invalid){
      if(this.EquipementFormGroup.get("designationCtrl")?.invalid){
        this.EquipementFormGroup.get("designationCtrl")?.disable()
      }
      if(this.EquipementFormGroup.get("localCtrl")?.invalid){
        this.EquipementFormGroup.get("localCtrl")?.disable()
      }
      if(this.EquipementFormGroup.get("numSerieCtrl")?.invalid){
        this.EquipementFormGroup.get("numSerieCtrl")?.disable()
      }
      if(this.EquipementFormGroup.get("familleCtrl")?.invalid){
        this.EquipementFormGroup.get("familleCtrl")?.disable()
      }
      if(this.EquipementFormGroup.get("dateexploitCtrl")?.invalid){
        this.EquipementFormGroup.get("dateexploitCtrl")?.disable()
      }
      if(this.EquipementFormGroup.get("dateachatCtrl")?.invalid){
        this.EquipementFormGroup.get("dateachatCtrl")?.disable()
      }
      if(this.EquipementFormGroup.get("periodiciteCtrl")?.invalid){
        this.EquipementFormGroup.get("periodiciteCtrl")?.disable()
      }

      if(this.EquipementFormGroup.get("descriptionCtrl")?.invalid){
        this.EquipementFormGroup.get("descriptionCtrl")?.disable()
      }

    }
    else if(this.EquipementFormGroup.disabled){
      this.EquipementFormGroup.markAllAsTouched()
    }
    else{
      this.openDialog()
    }
  }





  disableAll(){
    this.EquipementFormGroup.get("designationCtrl")?.disable()
    this.EquipementFormGroup.get("numSerieCtrl")?.disable()
    this.EquipementFormGroup.get("familleCtrl")?.disable()
    this.EquipementFormGroup.get("dateexploitCtrl")?.disable()
    this.EquipementFormGroup.get("dateachatCtrl")?.disable()
    this.EquipementFormGroup.get("periodiciteCtrl")?.disable()
    this.EquipementFormGroup.get("descriptionCtrl")?.disable()
    this.EquipementFormGroup.get("localCtrl")?.disable()
  }

  toggle(list:string[]){
    for(let i=0;i<list.length;i++){
      let input = this.EquipementFormGroup.get(list[i])
      input?.disabled ? input.enable() :input?.disable()
    }
  }

  resetEquipementFormGroup(){
    this.EquipementFormGroup.reset()
    this.EquipementFormGroup.get("designationCtrl")?.enable()
    this.EquipementFormGroup.get("numSerieCtrl")?.enable()
    this.EquipementFormGroup.get("familleCtrl")?.enable()
    this.EquipementFormGroup.get("dateexploitCtrl")?.enable()
    this.EquipementFormGroup.get("dateachatCtrl")?.enable()
    this.EquipementFormGroup.get("periodiciteCtrl")?.enable()
    this.EquipementFormGroup.get("descriptionCtrl")?.enable()
    this.EquipementFormGroup.get("localCtrl")?.enable()
  }

  quit(){
    this.dialog.getDialogById(this.concerned.getDialogId())?.close()
  }

}
