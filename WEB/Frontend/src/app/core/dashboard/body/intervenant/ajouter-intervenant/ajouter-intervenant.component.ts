import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyserviceService} from "../../../../services/myservice.service";
import {MatDialog} from "@angular/material/dialog";
import {map, startWith} from "rxjs/operators";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";
import {Intervenant} from "../../../../../public/models/Intervenant";
import {ErrorsService} from "../../../../services/errors.service";
import {ConcernedService} from "../../../../services/concerned.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-ajouter-intervenant',
  templateUrl: './ajouter-intervenant.component.html',
  styleUrls: ['./ajouter-intervenant.component.scss']
})
export class AjouterIntervenantComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete!: MatAutocompleteTrigger;
  constructor(private intervenantService: MyserviceService,private fb: FormBuilder,private toast:NgToastService,private concerned:ConcernedService,public dialog: MatDialog,readonly errorsService:ErrorsService) {

  }

  intervenant =new Intervenant();
  isLoading=this.intervenantService.isLoading

  myCtrl1 = new FormControl();
  filteredFunctions!: any;
  AllRoles:string[]=["PLOMBIER","MÉCANICIEN","ÉLECTRICIEN","PEINTRE"]


  IntervenantFormGroup= new FormGroup({
    nameCtrl: new FormControl('', [Validators.required]),
    prenameCtrl: new FormControl('', [Validators.required]),
    professionCtrl: new FormControl('', [Validators.required]),
    telCtrl: new FormControl('', [Validators.required,Validators.maxLength(8),Validators.minLength(8)]),
  })







  ngOnInit(): void {
    /*this.filteredAccess = this.myCtrl.valueChanges.pipe(

      startWith(''),

      map((myaccess: string | null) =>
      myaccess ? this._filter(myaccess) : this.AllAccess.slice()
      ),

    );*/




    /*for(let i=0;i<this.roles.length;i++){
      localStorage.setItem("role"+i,this.roles[i].name)
    }*/

    setInterval(()=>{this.isLoading=this.intervenantService.isLoading})
    this.filteredFunctions = this.IntervenantFormGroup.get('professionCtrl')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

  }





  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.AllRoles.filter((myvalue) =>
      myvalue.toLowerCase().includes(filterValue)
    );
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Intervenant",content:"Voulez vous Ajouter cet intervenant ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.AddIntervenant()
      }})
  }

  AddIntervenant(){
    this.intervenantService.isLoading.next(true)
    this.onSubmit()
    this.intervenantService.Add(this.intervenant,"/intervenants/intervenant/save").subscribe(
      (data) => {
        if (data !=null)
        {
          this.intervenantService.isLoading.next(false)
          this.dialog.getDialogById(this.concerned.getDialogId())?.close()
          this.toast.success({detail:"Intervenants",summary:'Intervenant Ajouté avec Succes',duration:2000});
        }
        else this.toast.error({detail:"Intervenants",summary:"Echec de l'ajout de l'Intervenant",duration:2000});
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
    else{
      this.openDialog()
    }
  }

}
