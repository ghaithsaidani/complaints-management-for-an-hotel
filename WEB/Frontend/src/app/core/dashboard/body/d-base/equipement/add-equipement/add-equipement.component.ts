import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyserviceService} from "../../../../../services/myservice.service";
import {Equipement} from "../../../../../../public/models/Equipement";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsService} from "../../../../../services/errors.service";
import {ConcernedService} from "../../../../../services/concerned.service";
import {Local} from "../../../../../../public/models/Local";
import {Observable} from "rxjs";
import {IDtoIDForm} from "../../../../../../public/models/Forms/IDtoIDFrom";
import {HttpResponse} from "@angular/common/http";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-add-equipement',
  templateUrl: './add-equipement.component.html',
  styleUrls: ['./add-equipement.component.scss']
})
export class AddEquipementComponent implements OnInit {
  equipement = new Equipement();
  keyword: any = ''
  startDate = new Date();
  isLoading = this.equipementService.isLoading
  locals:Local[]=[]
  filteredOptions!: Observable<string[]> | undefined;



  EquipementFormGroup= new FormGroup({
    designationCtrl: new FormControl('', [Validators.required]),
    numSerieCtrl: new FormControl('', [Validators.required]),
    familleCtrl: new FormControl('', [Validators.required]),
    dateachatCtrl: new FormControl('', [Validators.required]),
    dateexploitCtrl: new FormControl('', [Validators.required,this.validateDateExploit.bind(this)]),
    periodiciteCtrl: new FormControl('', [Validators.required,Validators.min(1)]),
    localCtrl: new FormControl('', [Validators.required]),
    descriptionCtrl: new FormControl(''),
  })

  get dateExploit(){
    return this.EquipementFormGroup.get('dateexploitCtrl') as FormControl
  }
  get dateAchat(){
    return this.EquipementFormGroup.get('dateachatCtrl') as FormControl
  }


  constructor(private equipementService: MyserviceService, private fb: FormBuilder, private toast: NgToastService, private dialog: MatDialog,readonly errorsService:ErrorsService,private concerned:ConcernedService) {}


  ngOnInit(): void {
    this.getLocals()
  }

  validateDateExploit(control: AbstractControl) : {[key: string]: any} | null {

    if (control.value && control.value<this.dateAchat.value) {
      return {'date_invalid': true};
    }
    return null;
  }

  validateDateAchat(control: AbstractControl) : {[key: string]: any} | null {

    if (control.value && control.value>this.dateExploit.value) {
      return {'date_invalid': true};
    }
    return null;
  }

  getLocals(){
    this.equipementService.Get("/locaux/all").subscribe(data=>{
      this.locals=data
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {data: {title: "Equipement",content: "Voulez vous Ajouter cette Equipement?"}, autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.AddEquipement()
      }
    })
  }




  /*private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }*/

  AddEquipement() {
    this.isLoading.next(true)
    this.onSubmit()
    this.equipementService.Add(this.equipement, "/equipements/equipement/save").subscribe(
      (data) => {
        if (data != null) {
          this.equipementService.enroll(new IDtoIDForm(this.EquipementFormGroup.get("localCtrl")?.value.id,data.id),"/locaux/equipement/addequipement").subscribe(()=>{
            if(HttpResponse){
              this.isLoading.next(false)
              this.dialog.getDialogById(this.concerned.getDialogId())?.close()
              this.toast.success({detail:"Equipements",summary:'Equipement Ajouté avec Succes',duration:2000});
            }
          })


        } else this.toast.error({detail:"Equipements",summary:"Echec de l'ajout du l'Equipement",duration:2000});
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
        this.EquipementFormGroup.get("designationCtrl")?.markAllAsTouched()
      }
      if(this.EquipementFormGroup.get("numSerieCtrl")?.invalid){
        this.EquipementFormGroup.get("numSerieCtrl")?.markAllAsTouched()
      }
      if(this.EquipementFormGroup.get("familleCtrl")?.invalid){
        this.EquipementFormGroup.get("familleCtrl")?.markAllAsTouched()
      }
      if(this.EquipementFormGroup.get("dateexploitCtrl")?.invalid){
        this.EquipementFormGroup.get("dateexploitCtrl")?.markAllAsTouched()
      }
      if(this.EquipementFormGroup.get("dateachatCtrl")?.invalid){
        this.EquipementFormGroup.get("dateachatCtrl")?.markAllAsTouched()
      }
      if(this.EquipementFormGroup.get("periodiciteCtrl")?.invalid){
        this.EquipementFormGroup.get("periodiciteCtrl")?.markAllAsTouched()
      }

      if(this.EquipementFormGroup.get("descriptionCtrl")?.invalid){
        this.EquipementFormGroup.get("descriptionCtrl")?.markAllAsTouched()
      }

    }
    else{
      this.openDialog()
    }
  }



}

