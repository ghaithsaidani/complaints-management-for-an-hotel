import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountsComponent } from './core/dashboard/body/accounts/accounts.component';
import { AuthComponent } from './core/auth/auth.component';
import { AccountdetailsComponent } from './core/dashboard/body/accounts/accountdetails/accountdetails.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { ConsultAccountsComponent } from './core/dashboard/body/accounts/consult-accounts/consult-accounts.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LocauxComponent } from './core/dashboard/body/d-base/locaux/locaux.component';
import { BodyComponent } from './core/dashboard/body/body.component';
import { EquipementComponent } from './core/dashboard/body/d-base/equipement/equipement.component';
import { TypePannesComponent } from './core/dashboard/body/d-base/type-pannes/type-pannes.component';
import { PiecesComponent } from './core/dashboard/body/d-base/pieces/pieces.component';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import { AddAccountComponent } from './core/dashboard/body/accounts/add-account/add-account.component';
import { AuthGuard } from './core/guards/auth.guard';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DBaseComponent } from './core/dashboard/body/d-base/d-base.component';
import { AddEquipementComponent } from './core/dashboard/body/d-base/equipement/add-equipement/add-equipement.component';
import { EquipementdetailsComponent } from './core/dashboard/body/d-base/equipement/equipementdetails/equipementdetails.component';
import { ConsultEquipementsComponent } from './core/dashboard/body/d-base/equipement/consult-equipements/consult-equipements.component';
import { ConsultLocauxComponent } from './core/dashboard/body/d-base/locaux/consult-locaux/consult-locaux.component';
import { RoomsComponent } from './core/dashboard/body/d-base/rooms/rooms.component';
import { AddRoomComponent } from './core/dashboard/body/d-base/rooms/add-room/add-room.component';
import { ConsultRoomsComponent } from './core/dashboard/body/d-base/rooms/consult-rooms/consult-rooms.component';
import { RoomDetailsComponent } from './core/dashboard/body/d-base/rooms/room-details/room-details.component';
import {AccountsGuard} from "./core/guards/accounts.guard";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import { HomeComponent } from './core/dashboard/body/home/home.component';
import { ReclamationsComponent } from './core/dashboard/body/reclamations/reclamations.component';
import { ConsultPannesComponent } from './core/dashboard/body/d-base/type-pannes/consult-pannes/consult-pannes.component';
import { PanneDetailsComponent } from './core/dashboard/body/d-base/type-pannes/panne-details/panne-details.component';
import { AddPanneComponent } from './core/dashboard/body/d-base/type-pannes/add-panne/add-panne.component';
import { ConsultReclamationsComponent } from './core/dashboard/body/reclamations/consult-reclamations/consult-reclamations.component';
import { AddReclamationComponent } from './core/dashboard/body/reclamations/add-reclamation/add-reclamation.component';
import { ReclamationDetailsComponent } from './core/dashboard/body/reclamations/reclamation-details/reclamation-details.component';
import { LocalDetailsComponent } from './core/dashboard/body/d-base/locaux/local-details/local-details.component';
import { AddLocalComponent } from './core/dashboard/body/d-base/locaux/add-local/add-local.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './public/components/dialog/dialog.component';
import { AddedSnackbarComponent } from './public/components/snackbars/added-snackbar/added-snackbar.component';
import { ModifiedSnackbarComponent } from './public/components/snackbars/modified-snackbar/modified-snackbar.component';
import { FailedSnackbarComponent } from './public/components/snackbars/failed-snackbar/failed-snackbar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { IntervenantComponent } from './core/dashboard/body/intervenant/intervenant.component';
import { AjouterIntervenantComponent } from './core/dashboard/body/intervenant/ajouter-intervenant/ajouter-intervenant.component';
import { ListeIntervenantComponent } from './core/dashboard/body/intervenant/liste-intervenant/liste-intervenant.component';
import { AfficherDetailsIntervenantComponent } from './core/dashboard/body/intervenant/afficher-details-intervenant/afficher-details-intervenant.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AfficherDetailsPieceComponent} from "./core/dashboard/body/d-base/pieces/afficher-details-piece/afficher-details-piece.component";
import {AfficherListePiecesComponent} from "./core/dashboard/body/d-base/pieces/afficher-liste-pieces/afficher-liste-pieces.component";
import {AjouterPieceComponent} from "./core/dashboard/body/d-base/pieces/ajouter-piece/ajouter-piece.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideNavbarComponent } from './public/components/side-navbar/side-navbar.component';
import {MatDividerModule} from '@angular/material/divider';
import { OtComponent } from './core/dashboard/body/ot/ot.component';
import { InterventionsComponent } from './core/dashboard/body/interventions/interventions.component';
import { ReportingComponent } from './core/dashboard/body/reporting/reporting.component';
import { ConsultInterventionsComponent } from './core/dashboard/body/interventions/consult-interventions/consult-interventions.component';
import { AddInterventionComponent } from './core/dashboard/body/interventions/add-intervention/add-intervention.component';
import { InterventionDetailsComponent } from './core/dashboard/body/interventions/intervention-details/intervention-details.component';
import { ConsultOtsComponent } from './core/dashboard/body/ot/consult-ots/consult-ots.component';
import { AddOtComponent } from './core/dashboard/body/ot/add-ot/add-ot.component';
import { OtDetailsComponent } from './core/dashboard/body/ot/ot-details/ot-details.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AuthService} from "./core/services/auth.service";
import {AuthInterceptor} from "./core/services/interceptors/auth.interceptor";
import {ChartService} from "./core/services/chart.service";
import { EmptyValidatorDirective } from './core/validators/empty-validator.directive';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { NgToastModule } from 'ng-angular-popup'
import {OTComponent} from "./core/dashboard/body/home/ot/ot.component";
import {PieceComponent} from "./core/dashboard/body/home/piece/piece.component";
import {PreventifComponent} from "./core/dashboard/body/preventif/preventif.component";
import {ReclamationComponent} from "./core/dashboard/body/home/reclamation/reclamation.component";
import { StaticsComponent } from './core/dashboard/body/home/statics/statics.component';
import { ChartComponent } from './core/dashboard/body/home/chart/chart.component';
import {
  AfficherDetailsPreventifComponent
} from "./core/dashboard/body/preventif/afficher-details-preventif/afficher-details-preventif.component";
import { AfficherListPreventifComponent } from './core/dashboard/body/preventif/afficher-list-preventif/afficher-list-preventif.component';
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountsComponent,
    AddAccountComponent,
    AuthComponent,
    AccountdetailsComponent,
    DashboardComponent,
    ConsultAccountsComponent,
    LocauxComponent,
    BodyComponent,
    BodyComponent,
    EquipementComponent,
    TypePannesComponent,
    PiecesComponent,
    AddAccountComponent,
    DBaseComponent,
    AddEquipementComponent,
    EquipementdetailsComponent,
    ConsultEquipementsComponent,
    ConsultLocauxComponent,
    RoomsComponent,
    AddRoomComponent,
    ConsultRoomsComponent,
    RoomDetailsComponent,
    HomeComponent,
    ReclamationsComponent,
    ConsultPannesComponent,
    PanneDetailsComponent,
    AddPanneComponent,
    ConsultReclamationsComponent,
    AddReclamationComponent,
    ReclamationDetailsComponent,
    LocalDetailsComponent,
    AddLocalComponent,
    DialogComponent,
    AddedSnackbarComponent,
    ModifiedSnackbarComponent,
    FailedSnackbarComponent,
    IntervenantComponent,
    AjouterIntervenantComponent,
    ListeIntervenantComponent,
    AfficherDetailsIntervenantComponent,
    AfficherDetailsPieceComponent,
    AjouterPieceComponent,
    AfficherListePiecesComponent,
    SideNavbarComponent,
    OtComponent,
    InterventionsComponent,
    ReportingComponent,
    ConsultInterventionsComponent,
    AddInterventionComponent,
    InterventionDetailsComponent,
    ConsultOtsComponent,
    AddOtComponent,
    OtDetailsComponent,
    EmptyValidatorDirective,

    OTComponent,
    PieceComponent,
    PreventifComponent,
    ReclamationComponent,
    StaticsComponent,
    ChartComponent,
    AfficherDetailsPreventifComponent,
    AfficherListPreventifComponent,
    PreventifComponent



  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatTableModule,
    MatMenuModule,
    MatStepperModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    FontAwesomeModule,
    MatDividerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    NgToastModule,
    MatIconModule

  ],
  providers: [AuthGuard,EmptyValidatorDirective,AuthService,AccountsGuard,AuthInterceptor,JwtHelperService,AppComponent,ChartService,

  {
      provide : JWT_OPTIONS,
      useValue: JWT_OPTIONS,

  },
  {
    provide : HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true

  },
    {provide: LOCALE_ID, useValue: 'fr' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
