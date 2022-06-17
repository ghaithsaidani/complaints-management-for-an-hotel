import {Component, Inject, OnInit} from '@angular/core';
import {MyserviceService} from "../../../services/myservice.service";
import {ChartService} from "../../../services/chart.service";
import {Chart, registerables} from "chart.js";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import * as _rollupMoment from 'moment';
import {Moment} from 'moment'
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {map} from "rxjs/operators";

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ReportingComponent implements OnInit{


  constructor(private chartService: ChartService,private reportingService:MyserviceService,private _adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private _locale: string,) {

    Chart.register(...registerables);
  }


  Reclamationschart!:Chart;
  ReclamationGroupedChart!:Chart
  IntervenantsChart!:Chart;
  EquipementsDisponibiliteChart!:Chart
  PanneChart!:Chart;


  ReclamationsChart() {
    this.chartService.getNb_Reclamations_Par_Reclameur().subscribe(data=>{
      let reclamations=data
      let Nom_reclameur=reclamations.map((reclamation: any)=>reclamation[0])
      let count=reclamations.map((reclamation: any)=>reclamation[1])

      let backgrounds: string[]=[];
      let borders: string[]=[];
      let percentage=100

      for(let i=0;i<Nom_reclameur.length;i++){
        /*let r= Math.floor(Math.random() * 255)
        let g= Math.floor(Math.random() * 255)
        let b= Math.floor(Math.random() * 255)*/
        //console.log(percentage)
        backgrounds.push('rgba('+1+', '+119+', '+253+','+ percentage+'%)')
        if(i<4 && percentage>30){
          percentage-=20
        }
        else{
          percentage+=20
        }

        //borders.push('rgba('+r+', '+g+', '+b+', 1)')
      }


      this.Reclamationschart=new Chart('canvas', {
        type: 'pie',
        data : {
          labels:Nom_reclameur,
          datasets: [{
            label: 'first chart',
            data: count,
            //fill: false,
            //borderColor: borders,
            borderWidth:0.4,
            backgroundColor:backgrounds,
            hoverOffset:2
            //tension: 0.1
          }],

        },
        options:{
          /*scales:{
            y:{
              beginAtZero:true
            }
          },*/
          plugins:{
            title:{
              display:true,
              text:'meilleurs Reclameurs',
              padding:{
                bottom:50,
              },

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
            y:{
              beginAtZero:true
            }
          },
          plugins:{
            title:{
              display:true,
              text:'Interventions par intervenants',
              padding:{
                bottom:50,
              },

            },
            legend:{
              display:false
            }
          }
        }
      });

    })
  }
  startDate = new Date();


  ngOnInit() {
    this.ReclamationsChart()
    this.IntervenantParOTChart()
    this.DisponibiliteEquipementsChart()
    this.PannesPlusRepeteChart()
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.reportingService.setnomgestion("Reporting")
    },0)

  }


  DateFormGroup=new FormGroup({
    date:new FormControl('',Validators.required),
    date1:new FormControl('',Validators.required)
  })

  TypeFormGroup = new FormGroup({
    typeCtrl: new FormControl('', Validators.required)

  });

  types= [
    {value: 'Par Jours'},
    {value: 'Par Mois'},
    { value: 'Par Année'}

  ];


  ReclamationsByDayChart() {
    let startDate=this.DateFormGroup.get('date')?.value._i.year+"-"+(parseInt(this.DateFormGroup.get('date')?.value._i.month)+1)+"-"+this.DateFormGroup.get('date')?.value._i.date
    let endDate=this.DateFormGroup.get('date1')?.value._i.year+"-"+(parseInt(this.DateFormGroup.get('date1')?.value._i.month)+1)+"-"+this.DateFormGroup.get('date1')?.value._i.date
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
      this.ReclamationGroupedChart=new Chart('canvas3', {
        type: 'line',
        data : {
          labels:jours,
          datasets: [{
            label: 'nombre Reclamations ',
            data: count,
            fill: true,
            backgroundColor:'rgb(1,119,253,5%)',
            borderColor: 'rgb(1,119,253)',
            tension: 0.3
            //borderColor: borders,
            //borderWidth:0.4,
            //backgroundColor:backgrounds,
            //hoverOffset:4
            //tension: 0.1
          }],

        },
        options:{
          scales:{
            y:{
              grid:{
                display:false
              }
            },
            x:{
              grid:{
                display:false
              }
            }
          },
          plugins:{
            title:{
              display:true,
              text:'Nombres Reclamations Par Jours',
              padding:{
                bottom:50,
              },

            },
            legend:{
              display:false
            }
          }
        }
      });

    })
  }



  ReclamationsByMonthChart() {
    let startDate=this.DateFormGroup.get('date')?.value._i.year+"-"+(parseInt(this.DateFormGroup.get('date')?.value._i.month)+1)+"-"+this.DateFormGroup.get('date')?.value._i.date
    let endDate=this.DateFormGroup.get('date1')?.value._i.year+"-"+(parseInt(this.DateFormGroup.get('date1')?.value._i.month)+1)+"-"+this.DateFormGroup.get('date1')?.value._i.date
    this.chartService.GetReclamationBetweenGroupedByMonth(startDate,endDate).subscribe(data=>{
      let reclamations=data
      let months=reclamations.map((reclamation: any)=>reclamation[0])
      let count=reclamations.map((reclamation: any)=>reclamation[1])

      let backgrounds: string[]=[];
      let borders: string[]=[];
      let percentage=100
      for(let i=0;i<months.length;i++){
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
      /*for(let i=0;i<reclamations.length;i++){
        let r= Math.floor(Math.random() * 255)
        let g= Math.floor(Math.random() * 255)
        let b= Math.floor(Math.random() * 255)

        backgrounds.push('rgba('+r+', '+g+', '+b+', 0.2)')
        borders.push('rgba('+r+', '+g+', '+b+', 1)')
      }*/
      this.ReclamationGroupedChart=new Chart('canvas3', {
        type: 'bar',
        data : {
          labels:months,
          datasets: [{
            label: 'nombre Reclamations ',
            data: count,
            //fill: false,
            //borderColor: borders,
            borderWidth:0.4,
            backgroundColor:backgrounds,
            //hoverOffset:4
            //tension: 0.1
          }],

        },
        options:{
          /*scales:{
            y:{
              beginAtZero:true
            }
          },*/
          plugins:{
            title:{
              display:true,
              text:'Nombres Reclamations Par Mois',
              padding:{
                bottom:50,
              },

            },
            legend:{
              display:false
            }
          }
        }
      });

    })
  }



  ReclamationsByYearChart() {
    let startDate=this.DateFormGroup.get('date')?.value._i.year+"-"+(parseInt(this.DateFormGroup.get('date')?.value._i.month)+1)+"-"+this.DateFormGroup.get('date')?.value._i.date
    let endDate=this.DateFormGroup.get('date1')?.value._i.year+"-"+(parseInt(this.DateFormGroup.get('date1')?.value._i.month)+1)+"-"+this.DateFormGroup.get('date1')?.value._i.date
    this.chartService.GetReclamationBetweenGroupedByYear(startDate,endDate).subscribe(data=>{
      let reclamations=data
      let months=reclamations.map((reclamation: any)=>reclamation[0])
      let count=reclamations.map((reclamation: any)=>reclamation[1])

      let backgrounds: string[]=[];
      let borders: string[]=[];
      let percentage=100
      for(let i=0;i<months.length;i++){
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
      /*for(let i=0;i<reclamations.length;i++){
        let r= Math.floor(Math.random() * 255)
        let g= Math.floor(Math.random() * 255)
        let b= Math.floor(Math.random() * 255)

        backgrounds.push('rgba('+r+', '+g+', '+b+', 0.2)')
        borders.push('rgba('+r+', '+g+', '+b+', 1)')
      }*/
      this.ReclamationGroupedChart=new Chart('canvas3', {
        type: 'bar',
        data : {
          labels:months,
          datasets: [{
            label: 'nombre Reclamations ',
            data: count,
            //fill: false,
            //borderColor: borders,
            borderWidth:0.4,
            backgroundColor:backgrounds,
            //hoverOffset:4
            //tension: 0.1
          }],

        },
        options:{
          /*scales:{
            y:{
              beginAtZero:true
            }
          },*/
          plugins:{
            title:{
              display:true,
              text:'Nombres Reclamations Par Année',
              padding:{
                bottom:50,
              },

            },
            legend:{
              display:false
            }
          }
        }
      });

    })
  }



  PannesPlusRepeteChart() {
    this.chartService.Panne_Plus_Repete().subscribe(data=>{
      let pannes:any[]=data

      let designation_panne:any[]=pannes.map((panne: any)=>panne[0])
      let count:any[]=pannes.map((panne: any)=>panne[1])

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
      for(let i=0;i<pannes.length;i++){
        /*let r= Math.floor(Math.random() * 255)
        let g= Math.floor(Math.random() * 255)
        let b= Math.floor(Math.random() * 255)*/
        //console.log(percentage)
        backgrounds.push('rgba('+1+', '+119+', '+253+','+ percentage+'%)')
        if(i<4 && percentage>30){
          percentage-=20
        }
        else{
          percentage+=20
        }

        //borders.push('rgba('+r+', '+g+', '+b+', 1)')
      }
      this.PanneChart=new Chart('canvas4', {
        type: 'doughnut',
        data : {
          labels:designation_panne,
          datasets: [{

            data: count,
            //fill: false,
            //borderColor: borders,
            borderWidth:0.4,
            backgroundColor:backgrounds,
            //hoverOffset:4
            //tension: 0.1
          }],

        },
        options:{
          plugins:{
            title:{
              display:true,
              text:'Type de Panne plus Repete',
              padding:{
                bottom:40,
              },

            },

            legend:{
              display:false
            },

          },


        }
      });

    })
  }




  DisponibiliteEquipementsChart() {
    this.chartService.GetDisponibilite().subscribe(data=>{
      let equipements:any[]=data

      let designation_equipement:any[]=equipements.map((equipement: any)=>equipement[0])
      let disponibilite:any[]=equipements.map((equipement: any)=>equipement[1])

      let backgrounds: string[]=[];
      let borders: string[]=[];

      /*for(let i=0;i<equipements.length;i++){
        let r= Math.floor(Math.random() * 255)
        let g= Math.floor(Math.random() * 255)
        let b= Math.floor(Math.random() * 255)
        backgrounds.push('rgba('+r+', '+g+', '+b+', 0.2)')
        borders.push('rgba('+r+', '+g+', '+b+', 1)')
      }*/
      let percentage=100
      for(let i=0;i<equipements.length;i++){
        /*let r= Math.floor(Math.random() * 255)
        let g= Math.floor(Math.random() * 255)
        let b= Math.floor(Math.random() * 255)*/
        //console.log(percentage)
        backgrounds.push('rgba('+1+', '+119+', '+253+','+ percentage+'%)')
        if(i<4 && percentage>30){
          percentage-=20
        }
        else{
          percentage+=20
        }

        //borders.push('rgba('+r+', '+g+', '+b+', 1)')
      }
      this.EquipementsDisponibiliteChart=new Chart('canvas2', {
        type: 'polarArea',
        data : {
          labels:designation_equipement,
          datasets: [{

            data: disponibilite,
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
            y:{
              beginAtZero:true
            }
          },
          plugins:{
            title:{
              display:true,
              text:'Disponibilte par Equipement',
              padding:{
                bottom:50,
              },

            },
            legend:{
              display:false
            }
          }
        }
      });

    })
  }

  validateForm(){
    if(this.DateFormGroup?.invalid){
      this.DateFormGroup.markAsTouched()
    }
    if(this.TypeFormGroup.get('typeCtrl')?.invalid){
      this.TypeFormGroup.get('typeCtrl')?.markAsTouched()
    }

    else{
      switch (this.TypeFormGroup.get('typeCtrl')?.value) {
        case "Par Jours":
          if(this.ReclamationGroupedChart!=null){
            this.ReclamationGroupedChart.destroy()
          }
          this.ReclamationsByDayChart()
          break
        case "Par Mois":
          if(this.ReclamationGroupedChart!=null){
            this.ReclamationGroupedChart.destroy()
          }
          this.ReclamationsByMonthChart()
          break
        case "Par Année":
          if(this.ReclamationGroupedChart!=null){
            this.ReclamationGroupedChart.destroy()
          }
          this.ReclamationsByYearChart()
      }
    }
  }







}
