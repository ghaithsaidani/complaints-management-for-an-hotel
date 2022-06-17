import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from "chart.js";
import {ChartService} from "../../../../services/chart.service";
import {TokenstorageService} from "../../../../services/tokenstorage.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(private chartService:ChartService,private tokenService:TokenstorageService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    if(this.fonction=='ADMINISTRATEUR'){
      this.ReclamationsByDayChart()
    }
    else{
      this.IntervenantParOTChart()
    }
  }

  ReclamationGroupedChart!:Chart
  IntervenantsChart!:Chart
  fonction=this.tokenService.getUser().fonction

  ReclamationsByDayChart() {

    let today=new Date()
    let endDate=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()
    let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDay()-7);
    let startDate=lastWeek.getFullYear()+"-"+(lastWeek.getMonth()+1)+"-"+lastWeek.getDate()

    console.log(startDate)
    console.log(endDate)
   this.chartService.GetReclamationBetweenGroupedByDay(startDate,endDate).subscribe(data=>{
      let reclamations=data
      let jours=reclamations.map((reclamation: any)=>reclamation[0])
      let count=reclamations.map((reclamation: any)=>reclamation[1])

      let backgrounds: string[]=[];
      let borders: string[]=[];
      for(let i=0;i<reclamations.length;i++){
        let r= Math.floor(Math.random() * 255)
        let g= Math.floor(Math.random() * 255)
        let b= Math.floor(Math.random() * 255)
        backgrounds.push('rgba('+r+', '+g+', '+b+', 0.2)')
        borders.push('rgba('+r+', '+g+', '+b+', 1)')
      }
      this.ReclamationGroupedChart=new Chart('canvas', {
        type: 'line',
        data : {
          labels:jours,
          datasets: [{
            label: 'nombre Reclamations ',
            data: count,
            fill: true,
            backgroundColor:'rgb(1,119,253,5%)',

            borderColor: 'rgb(1,119,253)',
            tension: 0.2,

            //borderColor: borders,
            //borderWidth:0.4,
            //backgroundColor:backgrounds,
            //hoverOffset:4
            //tension: 0.1
          }],

        },
        options:{
          scales:{
            x: {
              grid: {
                display: false,
              },
            },

            y: {
              grid: {
                display: false,
                //color: 'rgba(217,143,7,0.1)',
              },
            },
          },
          plugins:{
            title:{
              display:true,
              align:"center",

              text:'Nombres Reclamations Par Jours',
              fullSize:true,
              color:'rgb(1,119,253)',
              padding:{
                bottom:50,
              },
              font:{
                family:"Righteous",
                size:15,
                weight:"lighter",

              }

            },
            legend:{
              display:false
            }
          }
        }
      });

    })
  }










  IntervenantParOTChart() {
    this.chartService.getIntervenantsParOt().subscribe(data=>{
      let intervenants:any[]=data

      let Noms_Intervenants:any[]=intervenants.map((intervenant: any)=>intervenant[0])
      let count:any[]=intervenants.map((intervenant: any)=>intervenant[1])

      let backgrounds: string[]=[];
      let borders: string[]=[];
      /*Noms_Intervenants.map(()=> {
        let Symbols="0123456789ABCDEF"
        let color="#"
        for(let i=0;i<6;i++){
          color+=Symbols[Math.floor(Math.random() * 16)]
        }
        /!*const randomNum = () => Math.floor(Math.random() * 6);
        const randomRGB = () => `hsla(212,${randomNum()}%, ${randomNum()}%, 1)`;*!/
        randoms.push(color)
      })*/
      let percentage=100
      for(let i=0;i<Noms_Intervenants.length;i++){
        /*let r= Math.floor(Math.random() * 255)
        let g= Math.floor(Math.random() * 255)
        let b= Math.floor(Math.random() * 255)
        backgrounds.push('rgba('+r+', '+g+', '+b+', 0.2)')*/

        backgrounds.push('rgba('+1+', '+119+', '+253+','+ percentage+'%)')
        if(i<4 && percentage>30){
          percentage-=20
        }
        else{
          percentage+=20
        }
        //borders.push('rgba('+r+', '+g+', '+b+', 1)')
      }
      this.IntervenantsChart=new Chart('canvas1', {
        type: 'bar',
        data : {
          labels:Noms_Intervenants,
          datasets: [{

            data: count,
            //fill: false,
            //borderColor: borders,
            borderWidth:0.8,
            backgroundColor:backgrounds,
            //hoverOffset:4
            //tension: 0.1
          }],

        },
        options:{
          scales:{
            x: {
              grid: {
                display: false,
              },
            },

            y: {
              grid: {
                display: false,
                //color: 'rgba(217,143,7,0.1)',
              },
            },
          },
          plugins:{
            title:{
              display:true,
              align:"center",

              text:'Interventions Par Intervenants',
              fullSize:true,
              color:'rgb(1,119,253)',
              padding:{
                bottom:50,
              },
              font:{
                family:"Righteous",
                size:15,
                weight:"lighter",

              }

            },
            legend:{
              display:false
            }
          }
        }
      });

    })
  }

}
