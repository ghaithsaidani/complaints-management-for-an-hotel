import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MyserviceService} from "../../../../../services/myservice.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {Room} from "../../../../../../public/models/Room";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConcernedService} from "../../../../../services/concerned.service";
import {ErrorsService} from "../../../../../services/errors.service";
import {Rooms} from "../../../../../../public/shared/Rooms";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {

  room =new Room();
  keyword:any=''
  isLoading=this.roomService.isLoading

  rooms:Rooms[]=[]



  RoomFormGroup= new FormGroup({
    numeroCtrl: new FormControl('', [Validators.required,Validators.min(1),this.validateNumeroChambre.bind(this)]),
  })


  constructor(private cd:ChangeDetectorRef,private roomService: MyserviceService,private fb: FormBuilder,private toast:NgToastService,readonly errorsService:ErrorsService,private dialog:MatDialog,private concerned:ConcernedService) {

  }



  getRooms(){
    this.roomService.Get("/chambres/all").subscribe(data=>{
      this.rooms=data

    })
  }

  validateNumeroChambre(control: AbstractControl) : {[key: string]: any} | null {
    let rooms_numbers=this.rooms.map((room)=>room.numero)
    if (control.value && rooms_numbers.indexOf(control.value)!=-1) {
      return {'room_existed': true};
    }
    return null;
  }




  ngOnInit(): void {
    this.getRooms()
  }



  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Chambre",content:"Voulez vous Ajouter cette Chambre ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.AddRoom()
      }})
  }



  onSubmit() {
    this.room.numero=this.RoomFormGroup.get('numeroCtrl')?.value
  }
  AddRoom() {
    this.isLoading.next(true)
    this.onSubmit()
    this.roomService.Add(this.room,"/chambres/chambre/save").subscribe(
      (data) => {
        if (data !=null)
        {
          this.isLoading.next(false)
          this.dialog.getDialogById(this.concerned.getDialogId())?.close()
          this.toast.success({detail:"Chambres",summary:'Chambre Ajouté avec Succes',duration:2000});

        }
        else this.toast.error({detail:"Chambres",summary:"Echec de l'ajout du Chambre",duration:2000});
      },

    );
  }

  /*verifyexist(ctrl:FormControl){

    if(this.room.numero==this.RoomFormGroup.get('numeroCtrl')?.value){
      return {exist:true}

    }
    else return null
    /!*for(let i=0;i<this.rooms.length;i++){
      if(this.rooms[i].numero==this.RoomFormGroup.get('numeroCtrl')?.value){
        return {exist:true}
      }
    }
    return {exist:true}*!/
  }

  /!*verify(ctrl:AbstractControl){

    if(!this.verifyexist(ctrl)){
      return{exist:true}
    }

    return null
  }*!/*/


  validateForm() {
    if(this.RoomFormGroup.invalid){
      if(this.RoomFormGroup.get("numeroCtrl")?.invalid){
        //this.RoomFormGroup.get("numeroCtrl")?.setErrors({'incorrect':true});
        this.RoomFormGroup.get("numeroCtrl")?.markAllAsTouched()
      }
    }
    else{
      this.openDialog()
    }
  }

}
