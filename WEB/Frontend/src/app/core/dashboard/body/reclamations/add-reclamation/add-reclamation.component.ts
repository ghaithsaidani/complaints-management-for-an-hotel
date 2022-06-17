import { Component, OnInit, ViewChild} from '@angular/core';
import {Room} from "../../../../../public/models/Room";
import {MyserviceService} from "../../../../services/myservice.service";
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Reclamation} from "../../../../../public/models/reclamations/Reclamation";
import {Equipement} from "../../../../../public/models/Equipement";
import {IDtoIDForm} from "../../../../../public/models/Forms/IDtoIDFrom";
import {HttpResponse} from "@angular/common/http";
import {ConcernedService} from "../../../../services/concerned.service";
import {Panne} from "../../../../../public/models/Panne";
import {TokenstorageService} from "../../../../services/tokenstorage.service";
import {EmailtoIDForm} from "../../../../../public/models/Forms/EmailtoIDForm";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";
import {Local} from "../../../../../public/models/Local";
import {Observable} from "rxjs";
import {AddReclamationForm} from "../../../../../public/models/reclamations/AddReclamationForm";
import {ErrorsService} from "../../../../services/errors.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Equipements} from "../../../../../public/shared/Equipements";
import {Pannes} from "../../../../../public/shared/Pannes";
import {EmptyValidatorDirective} from "../../../../validators/empty-validator.directive";
import {NgToastService} from "ng-angular-popup";


export interface Priority {
  label: string;
  icon: string;
  color:string
}



@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.scss']
})
export class AddReclamationComponent implements OnInit {

  private pannespaginator!: MatPaginator;
  private equipementspaginator!: MatPaginator;
  private pannessort!: MatSort;
  private equipementssort!: MatSort;




  @ViewChild('sortEquipement') set EquipementSort(mp: MatSort) {
    this.equipementssort = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('sortPannes') set PannesSort(mp: MatSort) {
    this.pannessort = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('paginatorEquipement') set EquipementPaginator(mp: MatPaginator) {
    this.equipementspaginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('paginatorPannes') set PannesPaginator(mp: MatPaginator) {
    this.pannespaginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.pannes.paginator = this.pannespaginator;
    this.equipements.paginator=this.equipementspaginator
    this.pannes.sort=this.pannessort
    this.equipements.sort=this.equipementssort
  }

  /*@ViewChild(MatSort) sort!: MatSort;*/

  equipementsdisplayedColumns: string[] = ['designation','numSerie','famille','add'];
  pannesdisplayedColumns: string[] = ['designation','add'];

  reclamation = new Reclamation();

  keyword:any=''
  isLoading=this.reclamationService.isLoading
  selectedValue!: string;
  selectedValue1: any;
  types= [
    {value: 'chambre'},
    { value: 'local'}

  ];





  priorites:Priority[]=[
    {
      label:"Éleve",
      icon:"expand_less",
      color:"red"
    },
    {
      label:"Moyenne",
      icon:"density_medium",
      color:"orange"
    },
    {
      label:"Bas",
      icon:"expand_more",
      color:"green"
    }
  ]



  rooms:Room[]=[]
  locals:Local[]=[]
  equipements=new MatTableDataSource<Equipements>()
  pannes=new MatTableDataSource<Pannes>()
  reclamations:any[]=[]

  clickedRowEquipement !:Equipement;
  clickedRowPanne !:Panne;


  filteredPriorities!: Observable<Priority[]>;

  firstFormGroup!: FormGroup;
  etat=false
  changeetat(){
    this.etat=true
    console.log(this.etat)
  }



  TypeFormGroup = this.fb.group({
    typeCtrl: ['', Validators.required],

  });

  ChambreFormGroup =this.fb.group({
    chambreCtrl: ['', Validators.required],

  })

  LocalFormGroup =this.fb.group({
    localCtrl: ['', Validators.required],
  })

  PanneFormGroup =new FormGroup({
    panneCtrl: new FormControl('',[Validators.required]),
  })

  EquipementFormGroup =new FormGroup({
    equipementCtrl: new FormControl('',[Validators.required]),
  })

  LastFormGroup =this.fb.group({
    descriptionCtrl: [''],
    prioriteCtrl: ['', Validators.required],
  })


  constructor(private validatorDirective:EmptyValidatorDirective,private reclamationService: MyserviceService,private fb: FormBuilder,private toast:NgToastService,private Concerned:ConcernedService,private tokenService:TokenstorageService,public dialog: MatDialog,readonly errorsService:ErrorsService) {}



  get equipement(){
    return this.EquipementFormGroup.get('equipementCtrl') as FormControl
  }
  RefreshEquipementCtrl(){
    this.EquipementFormGroup=new FormGroup({
      equipementCtrl: new FormControl(this.equipement.value, [this.validatorDirective.validate.bind(this)]),
    })

  }

  get panne(){
    return this.PanneFormGroup.get('panneCtrl') as FormControl
  }
  RefreshPanneCtrl(){
    this.PanneFormGroup=new FormGroup({
      panneCtrl: new FormControl(this.panne.value, [this.validatorDirective.validate.bind(this)]),
    })

  }




  ngOnInit(): void {
  }



  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Reclamation",content:"Voulez vous Ajouter cette Reclamation ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.AddReclamation()
      }
    })
  }

  clickRow(element:any){
    switch(this.TypeFormGroup.get('typeCtrl')?.value){
      case "chambre":
        if(this.clickedRowPanne==element) {
          this.clickedRowPanne = new Panne()
          this.PanneFormGroup.get('panneCtrl')?.setValue('')
        }

        else {
          this.clickedRowPanne = element
          this.PanneFormGroup.get('panneCtrl')?.setValue(this.clickedRowPanne)
        }
        break
      case "local":
        if(this.clickedRowEquipement==element) {
          this.clickedRowEquipement = new Equipement()
          this.EquipementFormGroup.get('equipementCtrl')?.setValue('')
        }
        else {
          this.clickedRowEquipement = element
          this.EquipementFormGroup.get('equipementCtrl')?.setValue(this.clickedRowEquipement)
        }

        break

    }
  }



  getConcernedChambreOrLocal(){
    if (this.TypeFormGroup.get('typeCtrl')?.invalid){
      this.TypeFormGroup.get('typeCtrl')?.markAsTouched()
    }
    else {
      switch (this.TypeFormGroup.get('typeCtrl')?.value){
        case "chambre":
          this.reclamationService.Get("/chambres/active").subscribe(data=>{
            this.rooms=data.filter((room:Room)=>room.etat)
          })
          break
        case "local":
          this.reclamationService.Get("/locaux/active").subscribe(data=>{
            this.locals=data.filter((local:Local)=>local.etat)
          })
          break
      }

    }

  }

  getConcerned(){
    if(this.ChambreFormGroup.get('chambreCtrl')?.invalid && this.LocalFormGroup.get('localCtrl')?.invalid){
      this.ChambreFormGroup.get('chambreCtrl')?.markAsTouched()
      this.LocalFormGroup.get('localCtrl')?.markAsTouched()
    }
    else {
      switch (this.TypeFormGroup.get('typeCtrl')?.value){
        case "chambre":
          this.reclamationService.Get("/pannes/active/").subscribe(data=>{
            this.pannes.data=data
          })
          break
        case "local":
          this.reclamationService.getDetails(this.LocalFormGroup.get('localCtrl')?.value.id,"/locaux/find/").subscribe(data=>{
            this.equipements.data=data.equipements.filter((equipement:Equipement)=>equipement.etat_equipement==1 && equipement.etat)
          })
      }
    }

  }
  onSubmit() {

    this.reclamation.description=this.LastFormGroup.get('descriptionCtrl')?.value
    this.reclamation.type=this.TypeFormGroup.get('typeCtrl')?.value

    //this.reclamation.date_reclamation=new Date()
    this.reclamation.avancement=0
    switch(this.LastFormGroup.get('prioriteCtrl')?.value){
      case "Éleve":
        this.reclamation.priorite=2
        break;
      case "Moyenne":
        this.reclamation.priorite=1
        break;
      case "Bas":
        this.reclamation.priorite=0
        break
    }

  }


  AddReclamation(){
    this.reclamationService.isLoading.next(true)
    this.onSubmit()
    this.reclamationService.Add(this.reclamation,"/reclamations/reclamation/save").subscribe(data=>{
      if(data!=null){
        switch (this.TypeFormGroup.get('typeCtrl')?.value) {
          case "chambre":
            this.reclamationService.enroll(new AddReclamationForm(data.id, this.PanneFormGroup.get('panneCtrl')?.value.id,this.ChambreFormGroup.get('chambreCtrl')?.value.id), "/reclamations/addpannetoreclamation").subscribe(data => {
                this.reclamationService.enroll(new EmailtoIDForm(this.tokenService.getUser().email, data.id), "/users/reclamation/addtouser").subscribe(()=> {
                    if (HttpResponse) {
                      this.reclamationService.isLoading.next(false)
                      this.toast.success({detail:"Reclamations",summary:'Reclamation Ajouté avec Succes',duration:2000});
                      this.dialog.getDialogById(this.Concerned.getDialogId())?.close()
                    }
                  }
                )
              }
            )
            break
          case "local":
            this.reclamationService.enroll(new IDtoIDForm(data.id, this.EquipementFormGroup.get('equipementCtrl')?.value.id), "/reclamations/addequipementtoreclamation").subscribe(data => {
                this.reclamationService.enroll(new EmailtoIDForm(this.tokenService.getUser().email, data.id), "/users/reclamation/addtouser").subscribe(data => {
                    if (HttpResponse) {
                      this.reclamationService.isLoading.next(false)
                      this.toast.success({detail:"Reclamations",summary:'Reclamation Ajouté avec Succes',duration:2000});
                      this.dialog.getDialogById(this.Concerned.getDialogId())?.close()
                    }
                  }
                )
              }
            )
            break


        }
      }

    })
  }

  validateForm(){
    if(this.LastFormGroup.get('prioriteCtrl')?.invalid){
      this.LastFormGroup.get('prioriteCtrl')?.markAsTouched()
    }
    else{
      this.openDialog()
    }
  }

}
