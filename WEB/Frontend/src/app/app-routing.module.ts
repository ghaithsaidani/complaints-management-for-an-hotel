import { EquipementsGuard } from './core/guards/equipements.guard';
import { LocauxGuard } from './core/guards/locaux.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './core/dashboard/body/accounts/accounts.component';
import { AuthComponent } from './core/auth/auth.component';
import { LoginComponent } from './core/auth/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LocauxComponent } from './core/dashboard/body/d-base/locaux/locaux.component';
import { EquipementComponent } from './core/dashboard/body/d-base/equipement/equipement.component';
import { TypePannesComponent } from './core/dashboard/body/d-base/type-pannes/type-pannes.component';
import { PiecesComponent } from './core/dashboard/body/d-base/pieces/pieces.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DBaseComponent } from './core/dashboard/body/d-base/d-base.component';
import { AccountsGuard } from './core/guards/accounts.guard';
import { PannesGuard } from './core/guards/pannes.guard';
import {HomeComponent} from "./core/dashboard/body/home/home.component";
import {RoomsComponent} from "./core/dashboard/body/d-base/rooms/rooms.component";
import {ReclamationsComponent} from "./core/dashboard/body/reclamations/reclamations.component";
import {IntervenantComponent} from "./core/dashboard/body/intervenant/intervenant.component";
import {OtComponent} from "./core/dashboard/body/ot/ot.component";
import {InterventionsComponent} from "./core/dashboard/body/interventions/interventions.component";
import {ReportingComponent} from "./core/dashboard/body/reporting/reporting.component";
import {ChambresGuard} from "./core/guards/chambres.guard";
import {PiecesGuard} from "./core/guards/pieces.guard";
import {ReportingGuard} from "./core/guards/reporting.guard";
import {IntervenantsGuard} from "./core/guards/intervenants.guard";
import {InterventionsGuard} from "./core/guards/interventions.guard";
import {OtGuard} from "./core/guards/ot.guard";
import {ReclamationsGuard} from "./core/guards/reclamations.guard";
import {PreventifComponent} from "./core/dashboard/body/preventif/preventif.component";



const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
  ],
  },


  {path: 'dashboard',component: DashboardComponent,canActivate:[AuthGuard],children:[
      {path: 'home',component: HomeComponent},
      {path: 'preventif',component:PreventifComponent},
      {path: 'accounts',component: AccountsComponent,canActivate:[AccountsGuard]},
      { path: 'reclamations', component: ReclamationsComponent,canActivate:[ReclamationsGuard]},
      { path: 'ot', component:OtComponent,canActivate:[OtGuard]},
      { path: 'interventions', component: InterventionsComponent,canActivate:[InterventionsGuard]},
      { path: 'intervenants', component:IntervenantComponent,canActivate:[IntervenantsGuard]},
      {path:'d-base',component:DBaseComponent,children:[
        { path: 'locaux', component: LocauxComponent,canActivate:[LocauxGuard]},
        { path: 'chambres', component: RoomsComponent,canActivate:[ChambresGuard]},
        { path: 'equipements', component: EquipementComponent,canActivate:[EquipementsGuard]},
        { path: 'pannes', component: TypePannesComponent ,canActivate:[PannesGuard]},
          { path: 'pieces', component: PiecesComponent,canActivate:[PiecesGuard]},
      ]},

      { path: 'reporting', component:ReportingComponent,canActivate:[ReportingGuard]},

    ]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
