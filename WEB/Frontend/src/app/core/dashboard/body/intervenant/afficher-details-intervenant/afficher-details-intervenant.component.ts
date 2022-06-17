import {Component, OnInit, ViewChild} from '@angular/core';
import {ConcernedService} from "../../../../services/concerned.service";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MyserviceService} from "../../../../services/myservice.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsService} from "../../../../services/errors.service";
import {Intervenant} from "../../../../../public/models/Intervenant";
import {map, startWith} from "rxjs/operators";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-afficher-details-intervenant',
  templateUrl: './afficher-details-intervenant.component.html',
  styleUrls: ['./afficher-details-intervenant.component.scss']
})
export class AfficherDetailsIntervenantComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete!: MatAutocompleteTrigger;
  constructor(private intervenantService: MyserviceService,private fb: FormBuilder,private toast:NgToastService,private concerned:ConcernedService,public dialog: MatDialog,readonly errorsService:ErrorsService) {

  }

  intervenant =this.concerned.getintervenant();
  isLoading=this.intervenantService.isLoading

  myCtrl1 = new FormControl();
  filteredFunctions!: any;
  AllRoles:string[]=["PLOMBIER","MÉCANICIEN","ÉLECTRICIEN","PEINTRE"]


  IntervenantFormGroup= new FormGroup({
    nameCtrl: new FormControl(this.concerned.getintervenant().nom, [Validators.required]),
    prenameCtrl: new FormControl(this.concerned.getintervenant().prenom, [Validators.required]),
    professionCtrl: new FormControl(this.concerned.getintervenant().profession, [Validators.required]),
    telCtrl: new FormControl(this.concerned.getintervenant().tel, [Validators.required,Validators.maxLength(8),Validators.minLength(8)]),
  })







  ngOnInit(): void {
    setInterval(()=>{this.isLoading=this.intervenantService.isLoading})
    this.filteredFunctions = this.IntervenantFormGroup.get('professionCtrl')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.disableAll()

  }





  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.AllRoles.filter((myvalue) =>
      myvalue.toLowerCase().includes(filterValue)
    );
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Intervenant",content:"Voulez vous Modifier cet intervenant ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.ModifyIntervenant()
      }})
  }

  ModifyIntervenant(){
    this.intervenantService.isLoading.next(true)
    this.onSubmit()
    this.intervenantService.Modify(this.intervenant,"/intervenants/modifier").subscribe(
      (data) => {
        if (data !=null)
        {
          this.intervenantService.isLoading.next(false)
          this.dialog.getDialogById(this.concerned.getDialogId())?.close()
          this.toast.warning({detail:"Intervenants",summary:'Intervenant Modifié avec succes',duration:2000});
        }
        else this.toast.error({detail:"Intervenants",summary:"Echec du Modification du l'Intervenant",duration:2000});
      },

    );
  }





  onSubmit() {
    this.intervenant.nom=this.IntervenantFormGroup.get('nameCtrl')?.value
    this.intervenant.prenom=this.IntervenantFormGroup.get('prenameCtrl')?.value
    this.intervenant.profession=this.IntervenantFormGroup.get('professionCtrl')?.value
    this.intervenant.tel=this.IntervenantFormGroup.get('telCtrl')?.value
  }

  validateForm() {
    if(this.IntervenantFormGroup.invalid){
      if(this.IntervenantFormGroup.get("nameCtrl")?.invalid){
        this.IntervenantFormGroup.get("nameCtrl")?.markAllAsTouched()
      }
      if(this.IntervenantFormGroup.get("prenameCtrl")?.invalid){
        this.IntervenantFormGroup.get("prenameCtrl")?.markAllAsTouched()
      }
      if(this.IntervenantFormGroup.get("professionnCtrl")?.invalid){
        this.IntervenantFormGroup.get("professionnCtrl")?.markAllAsTouched()
      }
      if(this.IntervenantFormGroup.get("telCtrl")?.invalid){
        this.IntervenantFormGroup.get("telCtrl")?.markAllAsTouched()
      }
    }
    else if(this.IntervenantFormGroup.disabled){
      this.IntervenantFormGroup.markAllAsTouched()
    }
    else{
      this.openDialog()
    }
  }

  disableAll(){
    this.IntervenantFormGroup.get('nameCtrl')?.disable()
    this.IntervenantFormGroup.get('prenameCtrl')?.disable()
    this.IntervenantFormGroup.get('professionCtrl')?.disable()

    this.IntervenantFormGroup.get('telCtrl')?.disable()
  }

  toggle(list:string[]){
    for(let i=0;i<list.length;i++){
      let input = this.IntervenantFormGroup.get(list[i])
      input?.disabled ? input.enable() :input?.disable()
    }
  }

  resetIntervenantFormGroup(){
    this.IntervenantFormGroup.reset()
    this.IntervenantFormGroup.get('nameCtrl')?.enable()
    this.IntervenantFormGroup.get('prenameCtrl')?.enable()
    this.IntervenantFormGroup.get('professionCtrl')?.enable()
    this.IntervenantFormGroup.get('telCtrl')?.enable()
  }

  quit(){
    this.dialog.getDialogById(this.concerned.getDialogId())?.close()
  }
}
