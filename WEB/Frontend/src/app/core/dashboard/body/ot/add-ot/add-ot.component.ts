import { Component,  OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MyserviceService} from "../../../../services/myservice.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorsService} from "../../../../services/errors.service";
import {Intervenants} from "../../../../../public/shared/Intervenants";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OtForm} from "../../../../../public/models/ot/forms/OtForm";
import {ConcernedService} from "../../../../services/concerned.service";
import {Intervenant} from "../../../../../public/models/Intervenant";
import {ReclamationForm} from "../../../../../public/models/ot/forms/ReclamationForm";
import {ReclamationPanne} from "../../../../../public/models/reclamations/ReclamationPanne";
import {ReclamationEquipement} from "../../../../../public/models/reclamations/ReclamationEquipement";
import {ReclamationsEquipement, ReclamationsPanne} from "../../../../../public/shared/Reclamations";
import {EmptyValidatorDirective} from "../../../../validators/empty-validator.directive";
import {NgToastService} from "ng-angular-popup";
import {Preventif} from "../../../../../public/models/Preventif";


@Component({
  selector: 'app-add-ot',
  templateUrl: './add-ot.component.html',
  styleUrls: ['./add-ot.component.scss']
})
export class AddOtComponent implements OnInit {


  constructor(private emptyValidator:EmptyValidatorDirective,private myservice:MyserviceService,private fb: FormBuilder,readonly errorsService:ErrorsService,private dialog:MatDialog,private toast:NgToastService,private concerned:ConcernedService) {

  }

  private reclamationLocauxpaginator!: MatPaginator;
  private reclamationChambrespaginator!: MatPaginator;
  private reclamationLocauxsort!: MatSort;
  private reclamationChambressort!: MatSort;
  private intervenantspaginator!: MatPaginator;
  private intervenantssort!: MatSort;
  private preventifpaginator!: MatPaginator;
  private preventifsort!: MatSort;


  @ViewChild('sortReclamationChambres') set ReclamationChambresSort(mp: MatSort) {
    this.reclamationChambressort = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('sortReclamationLocaux') set ReclamationLocauxSort(mp: MatSort) {
    this.reclamationLocauxsort = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('paginatorReclamationChambres') set ReclamationChambresPaginator(mp: MatPaginator) {
    this.reclamationChambrespaginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('paginatorReclamationLocaux') set ReclamationLocauxPaginator(mp: MatPaginator) {
    this.reclamationLocauxpaginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('sortIntervenants') set IntervenantsSort(mp: MatSort) {
    this.intervenantssort = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('paginatorIntervenants') set IntervenantsPaginator(mp: MatPaginator) {
    this.intervenantspaginator = mp;
    this.setDataSourceAttributes();
  }


  @ViewChild('sortPreventif') set PreventifSort(mp: MatSort) {
    this.preventifsort = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('paginatorPreventif') set PreventifPaginator(mp: MatPaginator) {
    this.preventifpaginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.reclamationsLocaux.paginator = this.reclamationLocauxpaginator;
    this.reclamationsChambres.paginator=this.reclamationChambrespaginator
    this.reclamationsLocaux.sort=this.reclamationLocauxsort
    this.reclamationsChambres.sort=this.reclamationChambressort
    this.intervenants.paginator=this.intervenantspaginator
    this.intervenants.sort=this.intervenantssort
    this.preventives.paginator=this.preventifpaginator
    this.preventives.sort=this.preventifsort
  }

  ot = new OtForm();
  reclamationsdisplayedColumns: string[] = ['select','designation','emplacement','nom_reclameur','temps_estime'];
  preventifColumns: string[] = ['select','equipement','datePrevu','temps_estime'];
  intervenantsdisplayedColumns: string[] = ['select','nom','profession'];
  reclamations=new MatTableDataSource<any>()
  intervenants=new MatTableDataSource<Intervenants>()
  reclamationsChambres=new MatTableDataSource<any>()
  reclamationsLocaux=new MatTableDataSource<any>()
  preventives=new MatTableDataSource<any>()
  isLoading=this.myservice.isLoading


  types= [
    {value: 'chambres'},
    { value: 'locaux'},
    { value: 'preventif'}

  ];

  TypeFormGroup = this.fb.group({
    typeCtrl: ['', Validators.required],

  });





  IntervenantFormGroup =new FormGroup({
    intervenantsCtrl: new FormControl('', [Validators.required])
  })

  DescriptionFormGroup =this.fb.group({
    descriptionCtrl: new FormControl(''),
  })


  /*TempsEstimeArray!: FormArray;
  touchedRows: any;*/

  reclamationsLocauxselection = new SelectionModel<any>(true, []);
  reclamationsChambresselection = new SelectionModel<any>(true, []);
  preventifselection = new SelectionModel<any>(true, []);
  intervenantsselection = new SelectionModel<any>(true, []);
  reclamationForm=new MatTableDataSource<ReclamationForm>()

  GeneralFormGroup=this.fb.group(
    {
      ReclamationsLocauxFormGroup :new FormGroup({
        reclamationslocauxCtrl: new FormControl('', [Validators.required])
      }),
      TempsEstimeFormGroup : new FormGroup({
        'tempsestimeArray':new FormArray([])
      })
    }
  )

  SecondGeneralFormGroup=this.fb.group(
    {
      ReclamationsChambresFormGroup :new FormGroup({
        reclamationschambresCtrl: new FormControl('', [Validators.required])
      }),
      TempsEstimeFormGroup : new FormGroup({
        'tempsestimeArray':new FormArray([])
      })
    }
  )


  ThirdGeneralFormGroup=this.fb.group(
    {
      PreventifFormGroup :new FormGroup({
        preventifCtrl: new FormControl('', [Validators.required])
      }),
      TempsEstimeFormGroup : new FormGroup({
        'tempsestimeArray':new FormArray([])
      })
    }
  )



  getReclamations() {
    this.myservice.Get("/reclamations/active").subscribe(data=>{
      this.reclamations.data=data.filter((reclamation)=>reclamation.avancement==0)
      this.reclamationsChambres.data=this.reclamations.data.filter((reclamation)=>reclamation.type=="chambre")
      this.reclamationsLocaux.data=this.reclamations.data.filter((reclamation)=>reclamation.type=="local")
    })
  }

  getPreventives() {
    this.myservice.Get("/preventif/all").subscribe(data=>{
      this.preventives.data=data.filter((preventif)=>preventif.avancement==0)
    })
  }
  public getIntervenants():void{
    this.myservice.Get("/intervenants/active").subscribe(
      (data)=>{
        this.intervenants.data=data.filter((intervenant)=>intervenant.disponibilite==1)
      }
    )
  }

  get reclamationlocal(){
    return this.GeneralFormGroup.get('ReclamationsLocauxFormGroup')?.get('reclamationslocauxCtrl') as FormControl
  }

  get TempsEstimeLocauxArray(){
    return this.GeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray') as FormArray
  }
  RefreshReclamationLocauxCtrl(){
    this.GeneralFormGroup=this.fb.group(
      {
        ReclamationsLocauxFormGroup :new FormGroup({
          reclamationslocauxCtrl: new FormControl(this.reclamationlocal, [this.emptyValidator.validate.bind(this)])
        }),
        TempsEstimeFormGroup : new FormGroup({
          'tempsestimeArray':this.TempsEstimeLocauxArray
        })
      }
    )

  }

  get reclamationchambre(){
    return this.SecondGeneralFormGroup.get('ReclamationsChambresFormGroup')?.get('reclamationschambresCtrl') as FormControl
  }

  get TempsEstimeChambresArray(){
    return this.SecondGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray') as FormArray
  }
  RefreshReclamationsChambresCtrl(){
    this.SecondGeneralFormGroup=this.fb.group(
      {
        ReclamationsChambresFormGroup :new FormGroup({
          reclamationschambresCtrl: new FormControl(this.reclamationchambre, [this.emptyValidator.validate.bind(this)])
        }),
        TempsEstimeFormGroup : new FormGroup({
          'tempsestimeArray':this.TempsEstimeChambresArray
        })
      }
    )

  }


  get preventif(){
    return this.ThirdGeneralFormGroup.get('PreventifFormGroup')?.get('preventifCtrl') as FormControl
  }

  get TempsEstimePreventifArray(){
    return this.ThirdGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray') as FormArray
  }
  RefreshPreventifCtrl(){
    this.ThirdGeneralFormGroup=this.fb.group(
      {
        PreventifFormGroup :new FormGroup({
          preventifCtrl: new FormControl(this.reclamationchambre, [this.emptyValidator.validate.bind(this)])
        }),
        TempsEstimeFormGroup : new FormGroup({
          'tempsestimeArray':this.TempsEstimeChambresArray
        })
      }
    )

  }

  get intervenant(){
    return this.IntervenantFormGroup.get('intervenantsCtrl') as FormControl
  }
  RefreshIntervenantCtrl(){
    this.IntervenantFormGroup=new FormGroup({
      intervenantsCtrl: new FormControl(this.intervenant.value, [this.emptyValidator.validate.bind(this)]),
    })

  }



  ngOnInit(): void {
    this.getReclamations()
    this.getPreventives()
    this.getIntervenants()

    setInterval(()=>{
      switch (this.TypeFormGroup.get('typeCtrl')?.value){
        case 'chambres':
          this.SecondGeneralFormGroup.get('ReclamationsChambresFormGroup')?.get('reclamationschambresCtrl')?.setValue(this.reclamationsChambresselection.selected)

          break
        case 'locaux':
          this.GeneralFormGroup.get('ReclamationsLocauxFormGroup')?.get('reclamationslocauxCtrl')?.setValue(this.reclamationsLocauxselection.selected)
          break
        case 'preventif':
          this.ThirdGeneralFormGroup.get('PreventifFormGroup')?.get('preventifCtrl')?.setValue(this.preventifselection.selected)

      }
      this.IntervenantFormGroup.get('intervenantsCtrl')?.setValue(this.intervenantsselection.selected)
    },0)

    /*this.reclamationsLocaux.data.map(()=>{
      this.TempsEstimeFormGroup=new FormArray([
        new FormGroup({
          tempsEstime:new FormControl('', [Validators.required])
        })

      ])
    })*/







    /*setInterval(()=>{
      /!*this.reclamationselection.selected.map((reclamation)=>{
        this.TempsEstimeFormGroup.get('tempsEstime')?.setValue(this.TempsEstimeFormGroup.get('tempsEstime')?.value+this.TempsEstimeFormGroup.get('tempsEstime')?.value)
      })*!/
      console.log(this.TempsEstimeFormGroup.get('tempsestimeCtrl')?.value[0])
    },1000)*/
   /* console.log(this.concerned.getot())
    let body=document.getElementById('print-section')?.innerText;
    console.log(body)*/

  }

  get LocauxControls(){
    return (<FormArray>this.GeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray')).controls
  }

  onaddReclamationLocal(element:any){
    if(this.reclamationsLocauxselection.isSelected(element)){
      (<FormArray>this.GeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.controls.splice(this.reclamationsLocauxselection.selected.indexOf(element),1)

    }
    else{
      const control=new FormControl('',[Validators.required,Validators.min(1)]);
      (<FormArray>this.GeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.push(control)
    }
  }

  /*get ChambresControls(){
    return (<FormArray>this.SecondGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray')).controls
  }*/

  onaddReclamationChambre(element:any){
    if(this.reclamationsChambresselection.isSelected(element)){
      (<FormArray>this.SecondGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.controls.splice(this.reclamationsChambresselection.selected.indexOf(element),1)

    }
    else{
      const control=new FormControl('',[Validators.required,Validators.min(1)]);
      (<FormArray>this.SecondGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.push(control)
    }
  }

  get PreventifsControls(){
    return (<FormArray>this.ThirdGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray')).controls
  }

  onaddPreventif(element:any){
    if(this.preventifselection.isSelected(element)){
      (<FormArray>this.ThirdGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.controls.splice(this.preventifselection.selected.indexOf(element),1)

    }
    else{
      const control=new FormControl('',[Validators.required,Validators.min(1)]);
      (<FormArray>this.ThirdGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.push(control)
    }
  }


  InstanceofreclamationEquipement(element:ReclamationsEquipement){
    return  element.equipement!=null
  }

  InstanceofreclamationPanne(element:ReclamationsPanne){
    return element.chambre!=null && element.typePanne!=null
  }





  isAllSelected(selection:SelectionModel<any>,table:MatTableDataSource<any>) {
    const numSelected = selection.selected.length;
    const numRows = table.data.length;
    return numSelected === numRows;
  }


  masterToggle(selection:SelectionModel<any>,table:MatTableDataSource<any>) {

    if (this.isAllSelected(selection,table)) {
      selection.clear();
      if(table==this.reclamationsLocaux){
        (<FormArray>this.GeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.clear()
      }
      else if(table==this.reclamationsChambres){
        (<FormArray>this.SecondGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.clear()
      }
      else if(table==this.preventives){
        (<FormArray>this.ThirdGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.clear()
      }
      return;
    }

    if(table==this.reclamationsLocaux){
      (<FormArray>this.GeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.clear()
      for(let i=0;i<table.data.length;i++){
        const control=new FormControl('',[Validators.required]);
        (<FormArray>this.GeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.push(control)
      }
    }
    else if(table==this.reclamationsChambres){
      (<FormArray>this.SecondGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.clear()
      for(let i=0;i<table.data.length;i++){
        const control=new FormControl('',[Validators.required]);
        (<FormArray>this.SecondGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.push(control)
      }
    }

    else if(table==this.preventives){
      (<FormArray>this.ThirdGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.clear()
      for(let i=0;i<table.data.length;i++){
        const control=new FormControl('',[Validators.required]);
        (<FormArray>this.ThirdGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray'))?.push(control)
      }
    }
    selection.select(...table.data);
  }




  checkboxLabel(selection:SelectionModel<any>,table:MatTableDataSource<any>,row?: any): string {
    if (!row) {

      return `${this.isAllSelected(selection,table) ? 'deselect' : 'select'} all`;
    }
    return `${selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onSubmit() {
    let intervenantsId: number[]=[]

    this.ot.descriptionOt=this.DescriptionFormGroup.get('descriptionCtrl')?.value
    this.ot.type=this.TypeFormGroup.get('typeCtrl')?.value
    this.IntervenantFormGroup.get('intervenantsCtrl')?.value.map((intervenant:Intervenant)=>{intervenantsId.push(intervenant.id)})
    this.ot.listeIntervenantId=intervenantsId
    switch (this.TypeFormGroup.get('typeCtrl')?.value){
      case 'chambres':
        let reclamationsChambres:ReclamationForm[]=[]
        this.SecondGeneralFormGroup.get('ReclamationsChambresFormGroup')?.get('reclamationschambresCtrl')?.value.map((reclamation:ReclamationPanne)=>{reclamationsChambres.push(new ReclamationForm(reclamation.id,(<FormArray>this.SecondGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray')).controls[this.reclamationsChambresselection.selected.indexOf(reclamation)].value))})
        this.ot.reclamationList=reclamationsChambres
        break
      case 'locaux':
        let reclamationsLocaux:ReclamationForm[]=[]
        this.GeneralFormGroup.get('ReclamationsLocauxFormGroup')?.get('reclamationslocauxCtrl')?.value.map((reclamation:ReclamationEquipement)=>{reclamationsLocaux.push(new ReclamationForm(reclamation.id,(<FormArray>this.GeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray')).controls[this.reclamationsLocauxselection.selected.indexOf(reclamation)].value))})
        this.ot.reclamationList=reclamationsLocaux
        break
      case 'preventif':
        let preventifs:ReclamationForm[]=[]
        this.ThirdGeneralFormGroup.get('PreventifFormGroup')?.get('preventifCtrl')?.value.map((preventif:Preventif)=>{preventifs.push(new ReclamationForm(preventif.id,(<FormArray>this.ThirdGeneralFormGroup.get('TempsEstimeFormGroup')?.get('tempsestimeArray')).controls[this.preventifselection.selected.indexOf(preventif)].value))})
        this.ot.reclamationList=preventifs
    }

    //this.reclamation.date_reclamation=new Date()

  }

  AddOt(){
    this.myservice.isLoading.next(true)
    this.onSubmit()
    this.myservice.Add(this.ot,"/Ot/ajouter").subscribe(data=>{
      if(data!=null) {
        this.myservice.exportPdfOt(data.id).subscribe(res => {
          this.myservice.isLoading.next(false)
          this.toast.success({detail:"Ordre de Travail",summary:'Ordre de Travail Ajouté avec Succes',duration:2000});
          this.dialog.getDialogById(this.concerned.getDialogId())?.close()
          const file = new Blob([res], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })





      }
      else{
        this.toast.error({detail:"Ordre de Travail",summary:"Echec de l'ajout de l'Ordre de Travail",duration:2000});
      }

    })
  }


  openDialog() {

    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Ordre de Travail",content:"Voulez vous Ajouter cette Ordre de Travail ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.AddOt()
      }
    })
  }

  validateForm(){
    if(this.DescriptionFormGroup.get('descriptionCtrl')?.invalid){
      this.DescriptionFormGroup.get('descriptionCtrl')?.markAsTouched()
    }
    else{
      this.openDialog()
    }
  }


  date = new Date();
  date1 = new Date();
  datesys = new Date();

  compare(preventif: Preventif){
    this.date = new Date();

    this.datesys = new Date();

    this.date1 =new Date(preventif.datePrevue);
    this.datesys.setDate(this.datesys.getDate()+7);

    if (this.date1.getTime()<=(this.datesys.getTime()) && (this.date1.getTime()>=(this.date.getTime()))){
      return 1;

    }

    else if (this.date1.getTime()>=(this.date.getTime())){
      return 0;

    }

    else if (this.date1.getTime()<(this.date.getTime())){
      return 2;

    }
    else return null;


  }

}
