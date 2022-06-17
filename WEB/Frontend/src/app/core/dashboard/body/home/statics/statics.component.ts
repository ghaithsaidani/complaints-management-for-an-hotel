import { Component, OnInit } from '@angular/core';
import {MyserviceService} from "../../../../services/myservice.service";
import {StatisticsService} from "../../../../services/statistics.service";
import {TokenstorageService} from "../../../../services/tokenstorage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.scss']
})
export class StaticsComponent implements OnInit {

  constructor(private service:StatisticsService,private tokenService:TokenstorageService,private router:Router) { }

  ngOnInit(): void {
    this.getCountReclamationsNonTraite()
    this.getReclamationsTotalCount()
    this.getReclamationsUserCount()
    this.getAverageDispo()
    this.getCountOTEnCours()
  }
  nbReclamationsTotal!:any
  nbReclamationsUser!:any
  nbReclamationsNonTraite!:any
  nbOtEnCours!:any
  avg_dispo!:any



  getReclamationsTotalCount(){
    this.service.getReclamationsCount().subscribe((data)=>{
      if(data!=null){
        this.nbReclamationsTotal=data

      }
    })
  }

  getCountReclamationsNonTraite(){
    this.service.getReclamationsNonTraite().subscribe((data)=>{
      if(data!=null){
        this.nbReclamationsNonTraite=data

      }
    })
  }

  getCountOTEnCours(){
    this.service.getOtEnCours().subscribe((data)=>{
      if(data!=null){
        this.nbOtEnCours=data

      }
    })
  }


  getReclamationsUserCount(){
    this.service.getReclamationsUserCount(this.tokenService.getUser().id).subscribe((data)=>{
      if(data!=null){
        this.nbReclamationsUser=data

      }
    })
  }

  getAverageDispo(){
    this.service.getAverageDispo().subscribe((data)=>{
      if(data!=null){
        this.avg_dispo=data
      }
    })
  }

  goToReclamations(){
    this.router.navigate(['/dashboard/reclamations'])
  }

  goToOt(){
    this.router.navigate(['/dashboard/ot'])
  }





}
