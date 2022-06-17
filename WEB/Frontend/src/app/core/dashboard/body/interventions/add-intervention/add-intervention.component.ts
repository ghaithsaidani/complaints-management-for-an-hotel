import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MyserviceService} from "../../../../services/myservice.service";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorsService} from "../../../../services/errors.service";
import {MatDialog} from "@angular/material/dialog";
import {ConcernedService} from "../../../../services/concerned.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {ReclamationPanne} from "../../../../../public/models/reclamations/ReclamationPanne";
import {ReclamationEquipement} from "../../../../../public/models/reclamations/ReclamationEquipement";
import {DialogComponent} from "../../../../../public/components/dialog/dialog.component";
import {OtReclamationEquipement} from "../../../../../public/models/ot/OtReclamationEquipement";
import {OtReclamationPanne} from "../../../../../public/models/ot/OtReclamationPanne";
import {LigneOtEquipement} from "../../../../../public/models/ot/lignes/LigneOtEquipement";
import {LigneOtPanne} from "../../../../../public/models/ot/lignes/LigneOtPanne";
import {InterventionForm} from "../../../../../public/models/Forms/InterventionForm";
import {LigneInterventionForm} from "../../../../../public/models/Forms/LigneInterventionForm";
import {ReclamationsEquipement, ReclamationsPanne} from "../../../../../public/shared/Reclamations";
import {PieceForm} from "../../../../../public/models/Forms/PieceForm";
import {EmptyValidatorDirective} from "../../../../validators/empty-validator.directive";
import {NgToastService} from "ng-angular-popup";
import {Preventif} from "../../../../../public/models/Preventif";
import {OtPreventif} from "../../../../../public/models/ot/OtPreventif";
import {LigneOtPreventif} from "../../../../../public/models/ot/lignes/LigneOtPreventif";

@Component({
  selector: 'app-add-intervention',
  templateUrl: './add-intervention.component.html',
  styleUrls: ['./add-intervention.component.scss']
})
export class AddInterventionComponent implements OnInit,AfterViewInit {

  constructor(private cd:ChangeDetectorRef,private emptyValidator:EmptyValidatorDirective,private myservice:MyserviceService,private fb: FormBuilder,readonly errorsService:ErrorsService,private dialog:MatDialog,private toast:NgToastService,private concerned:ConcernedService) {}

  ngAfterViewInit(): void {
        this.cd.detectChanges()
    }


  private reclamationLocauxpaginator!: MatPaginator;
  private reclamationChambrespaginator!: MatPaginator;
  private preventifpaginator!: MatPaginator;
  private preventifssort!: MatSort;
  private reclamationLocauxsort!: MatSort;
  private reclamationChambressort!: MatSort;
  private OtLocauxpaginator!: MatPaginator;
  private OtLocauxsort!: MatSort;
  private OtPreventifpaginator!: MatPaginator;
  private OtPreventifsort!: MatSort;
  private OtChambrespaginator!: MatPaginator;
  private OtChambressort!: MatSort;
  private Piecespaginator!: MatPaginator;
  private Piecesssort!: MatSort;


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

  @ViewChild('sortPreventif') set PreventifSort(mp: MatSort) {
    this.preventifssort = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('paginatorPreventif') set PreventifPaginator(mp: MatPaginator) {
    this.preventifpaginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('paginatorReclamationLocaux') set ReclamationLocauxPaginator(mp: MatPaginator) {
    this.reclamationLocauxpaginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('OtLocauxsort') set OtLocauxSort(mp: MatSort) {
    this.OtLocauxsort = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('OtLocauxpaginator') set OtLocauxPaginator(mp: MatPaginator) {
    this.OtLocauxpaginator= mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('OtPreventifsort') set OtPreventifSort(mp: MatSort) {
    this.OtPreventifsort = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('OtPreventifpaginator') set OtPreventifPaginator(mp: MatPaginator) {
    this.OtPreventifpaginator= mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('OtChambressort') set OtChambresSort(mp: MatSort) {
    this.OtChambressort = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('OtChambrespaginator') set OtChambresPaginator(mp: MatPaginator) {
    this.OtLocauxpaginator= mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('Piecespaginator') set PiecePaginator(mp: MatPaginator) {
    this.Piecespaginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('Piecessort') set PiecesSort(mp: MatSort) {
    this.Piecesssort = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.reclamationsLocaux.paginator = this.reclamationLocauxpaginator;
    this.reclamationsChambres.paginator=this.reclamationChambrespaginator
    this.reclamationsLocaux.sort=this.reclamationLocauxsort
    this.reclamationsChambres.sort=this.reclamationChambressort
    this.otLocaux.paginator=this.OtLocauxpaginator
    this.otLocaux.sort=this.OtLocauxsort
    this.otChambres.paginator=this.OtChambrespaginator
    this.otChambres.sort=this.OtChambressort
    this.pieces.paginator=this.Piecespaginator
    this.pieces.sort=this.Piecesssort
    this.preventifs.paginator=this.preventifpaginator
    this.preventifs.sort=this.preventifssort
  }

  intervention = new InterventionForm();
  reclamationsdisplayedColumns: string[] = ['select','designation','emplacement','nom_reclameur'];
  preventifdisplayedColumns: string[] = ['select','equipement','datePrevu','etat'];
  OtColumns: string[] = ['select','num_ot'];
  PiecesdisplayedColumns: string[] = ['select','designation','quantiteStock','prixUnitaire','pieces_consome'];
  reclamationsLocaux=new MatTableDataSource<ReclamationsEquipement>()
  reclamationsChambres=new MatTableDataSource<ReclamationsPanne>()
  preventifs=new MatTableDataSource<Preventif>()
  otLocaux=new MatTableDataSource<OtReclamationEquipement>()
  otChambres=new MatTableDataSource<OtReclamationPanne>()
  otPreventifs=new MatTableDataSource<OtPreventif>()
  pieces=new MatTableDataSource<any>()
  //reclamationsChambres=new MatTableDataSource<any>()
  //reclamationsLocaux=new MatTableDataSource<any>()
  isLoading=this.myservice.isLoading


  types= [
    {value: 'chambres'},
    { value: 'locaux'},
    { value: 'preventif'}

  ];

  TypeFormGroup =new FormGroup({
    typeCtrl: new FormControl('', Validators.required),
  })

  ReclamationsLocauxFormGroup =new FormGroup({
    reclamationslocauxCtrl: new FormControl('', [Validators.required]),
  })

  ReclamationsChambresFormGroup =new FormGroup({
    reclamationschambresCtrl: new FormControl('', [Validators.required]),
  })

  PreventifFormGroup =new FormGroup({
    preventifCtrl: new FormControl('', [Validators.required]),
  })

  OtChambresFormGroup =new FormGroup({
    otchambresCtrl: new FormControl('', Validators.required),
  })

  OtLocauxFormGroup =new FormGroup({
    otlocauxCtrl: new FormControl('', Validators.required),
  })

  OtPreventifFormGroup =new FormGroup({
    otpreventifCtrl: new FormControl('', Validators.required),
  })




  DescriptionFormGroup =new FormGroup({
    descriptionCtrl: new FormControl(''),
  })

  GeneralFormGroup=this.fb.group({
    PiecesFormGroup :new FormGroup({
      piecesCtrl: new FormControl(''),
    }),
    PiecesConsomeFormGroup : new FormGroup({
      'piecesconsomeArray':new FormArray([])
    })
  })






  reclamationChambresselection = new SelectionModel<any>(true, []);
  reclamationLocauxselection = new SelectionModel<any>(true, []);
  preventifselection = new SelectionModel<any>(true, []);
  OtChambresselection = new SelectionModel<OtReclamationPanne>(false,[]);
  OtLocauxselection = new SelectionModel<OtReclamationEquipement>(false,[]);
  OtPreventifselection = new SelectionModel<OtReclamationEquipement>(false,[]);
  Piecesselection = new SelectionModel<any>(true, []);
  public getOts():void{
    this.myservice.Get("/Ot/active").subscribe(
      (data)=>{
        this.otLocaux.data=data.filter((ot:OtReclamationEquipement)=>ot.type=='locaux' && ot.cloturage==0)
        this.otChambres.data=data.filter((ot:OtReclamationPanne)=>ot.type=='chambres' && ot.cloturage==0)
        this.otPreventifs.data=data.filter((ot:OtPreventif)=>ot.type=='preventif' && ot.cloturage==0)
      }

    )
  }

  public getPieces():void{
    this.myservice.Get("/Pieces/active").subscribe(
      (data)=>{
        this.pieces.data=data.filter((piece)=>piece.etat)
      }

    )
  }


  clicked(){
    switch (this.TypeFormGroup.get('typeCtrl')?.value){
      case 'locaux':
          this.reclamationsLocaux.data = []
          this.myservice.getDetails(this.OtLocauxFormGroup.get('otlocauxCtrl')?.value.id, "/Ot/chercherParId/").subscribe(data => {
            this.reclamationsLocaux.data = data.reclamationsEquipement.map((ligne: LigneOtEquipement) => ligne.reclamation)
          })
        //this.OtFormGroup.get('otCtrl')?.value.reclamationsEquipement.map((recl:LigneOtEquipement)=>)
        break
      case 'chambres':

          this.reclamationsChambres.data = []
          this.myservice.getDetails(this.OtChambresFormGroup.get('otchambresCtrl')?.value.id, "/Ot/chercherParId/").subscribe(data => {
            this.reclamationsChambres.data = data.reclamationsPannes.map((ligne: LigneOtPanne) => ligne.reclamation)
            //data.reclamationsPannes.map((ligneReclamation:LigneOtPanne)=>this.reclamationsChambres.data.push(ligneReclamation.reclamation))
          })
        break

      case 'preventif':
        this.reclamationsChambres.data = []
        this.myservice.getDetails(this.OtPreventifFormGroup.get('otpreventifCtrl')?.value.id, "/Ot/chercherParId/").subscribe(data => {
          this.preventifs.data = data.preventifR.map((ligne: LigneOtPreventif) => ligne.preventif)
          //data.reclamationsPannes.map((ligneReclamation:LigneOtPanne)=>this.reclamationsChambres.data.push(ligneReclamation.reclamation))
        })

    }
  }

  InstanceofOtLocaux(element:OtReclamationEquipement){
    return element.reclamationsEquipement!=null
  }
  InstanceofOtChambres(element:OtReclamationPanne){
    return element.reclamationsPannes!=null
  }

  InstanceofPreventif(element:OtPreventif){
    return element.preventifR!=null
  }

  get piece(){
    return this.GeneralFormGroup.get('PiecesFormGroup')?.get('piecesCtrl') as FormControl
  }

  get PiecesConsomeArray(){
    return this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.get('piecesconsomeArray') as FormArray
  }
  /*RefreshPiecesCtrl(){
    this.GeneralFormGroup=this.fb.group({
      PiecesFormGroup :new FormGroup({
        piecesCtrl: new FormControl(this.piece),
      }),
      PiecesConsomeFormGroup : new FormGroup({
        'piecesconsomeArray':this.PiecesConsomeArray
      })
    })
    console.log(this.GeneralFormGroup)
    console.log(this.GeneralFormGroup.get('piecesconsomeArray')?.value)

  }*/
  getPiecesCtrl(){
    console.log(this.GeneralFormGroup)
    console.log(this.PiecesConsomeArray?.controls)
  }


  get Controls(){
    return (<FormArray>this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.get('piecesconsomeArray')) as FormArray
  }


  onadd(element:any){
    if(this.Piecesselection.isSelected(element)){
      // (<FormArray>this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.get('piecesconsomeArray'))?.value.splice(this.Piecesselection.selected.indexOf(element),1)
      (<FormArray>this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.get('piecesconsomeArray'))?.removeAt(this.Piecesselection.selected.indexOf(element))/*controls.splice(this.Piecesselection.selected.indexOf(element),1)*/

      this.getPiecesCtrl()
    }
    else{
      const control=new FormControl('',[Validators.required,Validators.max(element.quantiteStock)]);
      (<FormArray>this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.get('piecesconsomeArray'))?.push(control)
      this.getPiecesCtrl()

    }
  }


  ngOnInit(): void {
    this.getOts()
    this.getPieces()
    setInterval(() => {
      this.OtLocauxFormGroup.get('otlocauxCtrl')?.setValue(this.OtLocauxselection.selected[0])
      this.OtChambresFormGroup.get('otchambresCtrl')?.setValue(this.OtChambresselection.selected[0])
      this.OtPreventifFormGroup.get('otpreventifCtrl')?.setValue(this.OtPreventifselection.selected[0])
      this.ReclamationsChambresFormGroup.get('reclamationschambresCtrl')?.setValue(this.reclamationChambresselection.selected)
      this.ReclamationsLocauxFormGroup.get('reclamationslocauxCtrl')?.setValue(this.reclamationLocauxselection.selected)
      this.PreventifFormGroup.get('preventifCtrl')?.setValue(this.preventifselection.selected)
      this.GeneralFormGroup.get('PiecesFormGroup')?.get('piecesCtrl')?.setValue(this.Piecesselection.selected)
    }, 0)
  }


  get otChambre(){
    return this.OtChambresFormGroup.get('otchambresCtrl') as FormControl
  }
  RefreshOtChambreCtrl(){
    this.OtChambresFormGroup =new FormGroup({
      otchambresCtrl: new FormControl(this.otChambre, this.emptyValidator.validate.bind(this)),
    })

  }

  get otLocal(){
    return this.OtLocauxFormGroup.get('otlocauxCtrl') as FormControl
  }
  RefreshOtLocauxCtrl(){
    this.OtLocauxFormGroup =new FormGroup({
      otlocauxCtrl: new FormControl(this.otLocal, [this.emptyValidator.validate.bind(this)]),
    })
    //console.log(this.otLocal)
  }

  get otPreventif(){
    return this.OtPreventifFormGroup.get('otpreventifCtrl') as FormControl
  }
  RefreshOtPreventifCtrl(){
    this.OtPreventifFormGroup =new FormGroup({
      otpreventifCtrl: new FormControl(this.otPreventif, this.emptyValidator.validate.bind(this)),
    })

  }

  get reclamationLocal(){
    return this.ReclamationsLocauxFormGroup.get('reclamationslocauxCtrl') as FormControl
  }
  RefreshReclamationsLocauxCtrl(){
    this.ReclamationsLocauxFormGroup =new FormGroup({
      reclamationslocauxCtrl: new FormControl(this.reclamationLocal, this.emptyValidator.validate.bind(this)),
    })



  }

  get reclamationChambre(){
    return this.ReclamationsChambresFormGroup.get('reclamationschambresCtrl') as FormControl
  }
  RefreshReclamationsChambresCtrl(){
    this.ReclamationsChambresFormGroup =new FormGroup({
      reclamationschambresCtrl: new FormControl(this.reclamationChambre, this.emptyValidator.validate.bind(this)),
    })

  }


  get preventif(){
    return this.PreventifFormGroup.get('preventifCtrl') as FormControl
  }
  RefreshPreventifCtrl(){
    this.ReclamationsLocauxFormGroup =new FormGroup({
      reclamationslocauxCtrl: new FormControl(this.preventif, this.emptyValidator.validate.bind(this)),
    })



  }




  isAllSelected(selection:SelectionModel<any>,table:MatTableDataSource<any>) {
    const numSelected = selection.selected.length;
    const numRows = table.data.length;
    return numSelected === numRows;
  }


  masterToggle(selection:SelectionModel<any>,table:MatTableDataSource<any>) {
    if (this.isAllSelected(selection,table)) {
      selection.clear();

      (<FormArray>this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.get('piecesconsomeArray'))?.clear()

      return;
    }
    (<FormArray>this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.get('piecesconsomeArray'))?.clear()
    for(let i=0;i<table.data.length;i++){
      const control=new FormControl('');
      (<FormArray>this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.get('piecesconsomeArray'))?.push(control)
    }
    this.getPiecesCtrl()
    selection.select(...table.data);
  }




  checkboxLabel(selection:SelectionModel<any>,table:MatTableDataSource<any>,row?: any): string {
    if (!row) {
      return `${this.isAllSelected(selection,table) ? 'deselect' : 'select'} all`;
    }
    return `${selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  onSubmit() {
    this.intervention.descriptionIntervention=this.DescriptionFormGroup.get('descriptionCtrl')?.value

    switch (this.TypeFormGroup.get('typeCtrl')?.value){
      case 'chambres':
        this.intervention.otId=this.OtChambresFormGroup.get('otchambresCtrl')?.value.id
        let r1:any[]=[];
        let pieceForm:PieceForm[]=[];
        (<FormArray>this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.get('piecesconsomeArray'))?.controls.map((piece:AbstractControl)=>{pieceForm.push(new PieceForm(piece.value.id,(piece.value)))})
        for(let i=0;i<pieceForm.length;i++){
          pieceForm[i].idPiece=this.GeneralFormGroup.get('PiecesFormGroup')?.get('piecesCtrl')?.value[i].id
        }


        this.reclamationsChambres.data.map((reclamation:ReclamationPanne)=> {
          if(this.reclamationChambresselection.selected.indexOf(reclamation)==-1)
          {

            r1.push(new LigneInterventionForm(reclamation.id, 0,pieceForm))
          }

          else{

            r1.push(new LigneInterventionForm(reclamation.id, 2,pieceForm))
          }

        })
        this.intervention.ligneInterventionFormsList=r1
        break
      case 'locaux':
        this.intervention.otId=this.OtLocauxFormGroup.get('otlocauxCtrl')?.value.id
        let r:any[]=[];
        let pieceForm1:PieceForm[]=[];
        (<FormArray>this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.get('piecesconsomeArray'))?.controls.map((piece:AbstractControl)=>{pieceForm1.push(new PieceForm(piece.value.id,piece.value))})
        for(let i=0;i<pieceForm1.length;i++){
          pieceForm1[i].idPiece=this.GeneralFormGroup.get('PiecesFormGroup')?.get('piecesCtrl')?.value[i].id
        }

        this.reclamationsLocaux.data.map((reclamation:ReclamationEquipement)=> {
          if(this.reclamationLocauxselection.selected.indexOf(reclamation)==-1)
            r.push(new LigneInterventionForm(reclamation.id, 0,pieceForm1))
          else r.push(new LigneInterventionForm(reclamation.id, 2,pieceForm1))

        })
        this.intervention.ligneInterventionFormsList=r
        break
      case 'preventif':
        this.intervention.otId=this.OtPreventifFormGroup.get('otpreventifCtrl')?.value.id
        let r2:any[]=[];
        let pieceForm2:PieceForm[]=[];
        (<FormArray>this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.get('piecesconsomeArray'))?.controls.map((piece:AbstractControl)=>{pieceForm2.push(new PieceForm(piece.value.id,piece.value))})
        for(let i=0;i<pieceForm2.length;i++){
          pieceForm2[i].idPiece=this.GeneralFormGroup.get('PiecesFormGroup')?.get('piecesCtrl')?.value[i].id
        }

        this.preventifs.data.map((preventif:Preventif)=> {
          if(this.preventifselection.selected.indexOf(preventif)==-1)
            r2.push(new LigneInterventionForm(preventif.id, 0,pieceForm2))
          else r2.push(new LigneInterventionForm(preventif.id, 2,pieceForm2))

        })
        this.intervention.ligneInterventionFormsList=r2




    }
    console.log(<FormArray>this.GeneralFormGroup.get('PiecesConsomeFormGroup')?.value)
    //this.reclamation.date_reclamation=new Date()

  }

  AddIntervention(){
    this.myservice.isLoading.next(true)
    this.onSubmit()
    this.myservice.Add(this.intervention,"/interventions/ajouter").subscribe(data=>{
      if(data!=null) {
        this.myservice.isLoading.next(false)
        this.toast.success({detail:"Interventions",summary:'Intervention Ajouté avec Succes',duration:2000});
        this.dialog.getDialogById(this.concerned.getDialogId())?.close()
      }
      else{
        this.toast.error({detail:"Interventions",summary:"Echec de l'ajout de l'Intervention",duration:2000});
      }

    })
  }


  openDialog() {
    this.onSubmit()
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Interventions",content:"Voulez vous Ajouter cette Intervention ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.AddIntervention()
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
