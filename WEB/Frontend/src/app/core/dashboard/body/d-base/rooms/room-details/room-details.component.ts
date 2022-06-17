import { Component, OnInit } from '@angular/core';
import {ConcernedService} from "../../../../../services/concerned.service";
import {Room} from "../../../../../../public/models/Room";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyserviceService} from "../../../../../services/myservice.service";
import {ErrorsService} from "../../../../../services/errors.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../../../../public/components/dialog/dialog.component";
import {AccessService} from "../../../../../services/access.service";
import {NgToastService} from "ng-angular-popup";
import {Rooms} from "../../../../../../public/shared/Rooms";

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

  room =this.concerned.getroom();
  keyword:any=''
  isLoading=this.roomService.isLoading
  rooms:Rooms[]=[]

  //rooms:Rooms[]=[]

  //myCtrl1 = new FormControl();
  //filteredFunctions!: Observable<string[]>;


  RoomFormGroup= new FormGroup({
    numeroCtrl: new FormControl(this.room.numero, [Validators.required,Validators.min(1),this.validateNumeroChambre.bind(this)]),
  })


  constructor(private roomService: MyserviceService,private fb: FormBuilder,private toast:NgToastService,readonly errorsService:ErrorsService,private dialog:MatDialog,private concerned:ConcernedService,readonly accessService:AccessService) {

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
    this.disableAll()
    //setTimeout(()=>this.verifyexist(),0)
    //console.log(this.RoomFormGroup)
  }



  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent,{data:{title:"Chambre",content:"Voulez vous Ajouter cette Chambre ?"},autoFocus: false,panelClass: 'choice-dialog-container'});
    dialogRef.afterClosed().subscribe(result=>{

      if(result=="true"){
        this.ModifyRoom()
      }})
  }



  onSubmit() {
    this.room.numero=this.RoomFormGroup.get('numeroCtrl')?.value
  }
  ModifyRoom() {
    this.isLoading.next(true)
    this.onSubmit()
    this.roomService.Add(this.room,"/chambres/chambre/save").subscribe(
      (data) => {
        if (data !=null)
        {
          this.isLoading.next(false)
          this.dialog.getDialogById(this.concerned.getDialogId())?.close()
          this.toast.warning({detail:"Chambres",summary:'Chambre Modifié avec succes',duration:2000});

        }
        else this.toast.error({detail:"Chambres",summary:"Echec du Modification du Chambre",duration:2000});
      },

    );
  }


  validateForm() {
    if(this.RoomFormGroup.invalid){
      if(this.RoomFormGroup.get("numeroCtrl")?.invalid){
        //this.RoomFormGroup.get("numeroCtrl")?.setErrors({'incorrect':true});
        this.RoomFormGroup.get("numeroCtrl")?.markAllAsTouched()
      }
    }
    else if(this.RoomFormGroup.disabled){
      this.RoomFormGroup.markAllAsTouched()
    }
    else{
      this.openDialog()
    }
  }

  activate_desactivate(room:Room,etat:boolean){
    if(etat){
      this.roomService.getDetails(room.id,"/chambres/find/").subscribe(data=> {
        room.etat = false
        this.disableAll()
        this.roomService.activate_desactivate(data.id, "/chambres/chambre/desactivate/").subscribe(

        )
      })
    }
    else{
      this.roomService.getDetails(room.id, "/chambres/find/").subscribe(data => {
        room.etat = true
        this.roomService.activate_desactivate(data.id, "/chambres/chambre/activate/").subscribe()

      })
    }
  }

  disableAll(){
    this.RoomFormGroup.get('numeroCtrl')?.disable()
  }

  toggle(list:string[]){
    for(let i=0;i<list.length;i++){
      let input = this.RoomFormGroup.get(list[i])
      input?.disabled ? input.enable() :input?.disable()
    }
  }

  resetRoomFormGroup(){
    this.RoomFormGroup.reset()
    this.RoomFormGroup.get('numeroCtrl')?.enable()
  }

  quit(){
    this.dialog.getDialogById(this.concerned.getDialogId())?.close()
  }
}
