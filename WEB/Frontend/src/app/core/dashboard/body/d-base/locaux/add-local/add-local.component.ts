import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../../../services/myservice.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Local} from "../../../../../../public/models/Local";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsService} from "../../../../../services/errors.service";
import {ConcernedService} from "../../../../../services/concerned.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-add-local',
  templateUrl: './add-local.component.html',
  styleUrls: ['./add-local.component.scss']
})
export class AddLocalComponent implements OnInit {

  local =new Local();
  keyword:any=''
  isLoading=this.localService.isLoading





  LocalFormGroup= new FormGroup({
    parentCtrl: new FormControl('', [Validators.required]),
    descriptionCtrl: new FormControl('', [Validators.required]),
  })


  constructor(private localService: MyserviceService,private fb: FormBuilder,private toast:NgToastService,readonly errorsService:ErrorsService,private dialog:MatDialog,private concerned:ConcernedService) {

  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Local",content:"Voulez vous Ajouter cet Local ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.AddLocal()
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
    /*this.filteredAccess = this.myCtrl.valueChanges.pipe(

      startWith(''),

      map((myaccess: string | null) =>
      myaccess ? this._filter(myaccess) : this.AllAccess.slice()
      ),

    );*/






    /*for(let i=0;i<this.roles.length;i++){
      localStorage.setItem("role"+i,this.roles[i].name)
    }*/

    setInterval(()=>{this.isLoading=this.localService.isLoading})

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



  AddLocal() {
    this.localService.isLoading.next(true)
    this.onSubmit()
    this.localService.Add(this.local,"/locaux/local/save").subscribe(
      (data) => {
        if (data !=null)
        {

          this.localService.isLoading.next(false)
          this.dialog.getDialogById(this.concerned.getDialogId())?.close()
          this.toast.success({detail:"Locaux",summary:'Local Ajouté avec Succes',duration:2000});

        }
        else this.toast.error({detail:"Locaux",summary:"Echec de l'ajout du Local",duration:2000});
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
    else{
      this.openDialog()
    }
  }

}
