import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }


  getEmailErrorMessage(emailCtrl: any) {
    if (emailCtrl?.hasError('required')) {
      return 'vous pouvez entrez un email';
    }

    return emailCtrl.hasError('email') ? 'email invalide' : '';
  }

  getNameErrorMessage() {
    return 'vous pouvez entrez un nom';
  }
  getPreNameErrorMessage() {
    return 'vous pouvez entrez un prenom';
  }
  getFonctionErrorMessage() {
    return 'vous pouvez entrez un Role';
  }
  getPhoneErrorMessage(phoneCtrl:any) {
    if(phoneCtrl?.hasError('maxlength') || phoneCtrl.hasError('minlength')){
      return 'vous pouvez entrez un numero de Télephone composé de 8 chiffres';
    }
    return 'vous pouvez entrez un Numero de Telephone';
  }

  getPasswordErrorMessage() {
    return 'vous pouvez entrez un mot de Passe';
  }

  getParentErrorMessage() {
    return 'vous pouvez entrez un parent';
  }

  getDescriptionErrorMessage() {
    return 'vous pouvez entrez une description';
  }

  getPeriodiciteErrorMessage() {
    return 'vous pouvez entrez une periodicte de maintenance';
  }

  getDateAchatErrorMessage(dateCtrl:any) {
    if(dateCtrl?.hasError('max')){
      return "vous pouvez entrez une date d'achat valide ";
    }

    return "vous pouvez entrez une date d'achat de l'equipement";
  }

  getDateExploitErrorMessage() {
    return "vous pouvez entrez une date d'exploit de l'equipement";
  }

  getDesignationErrorMessage() {
    return 'vous pouvez entrez une designation';
  }

  getNumserieErrorMessage() {
    return 'vous pouvez entrez un numero de serie';
  }

  getFamilleErrorMessage() {
    return 'vous pouvez entrez une famille';
  }

  getEmplacementErrorMessage() {
    return "vous pouvez entrez l'emplacement du stock";
  }
  getQuantiteStockErrorMessage(quantitestockCtrl:any,quantiteminimal:any) {
    if( quantitestockCtrl.hasError('min')){
      return 'vous pouvez entrez une quantité de stock > 0';
    }
    /*if( quantitestockCtrl?.value<quantiteminimal?.value){
      return 'vous pouvez entrez une quantité de stock > quantite minimal';
    }*/
    return 'vous pouvez entrez la quantite de stock piece';
  }

  getQuantiteMinimalErrorMessage(quantiteminimaleCtrl:any) {
    if( quantiteminimaleCtrl.hasError('min')){
      return 'vous pouvez entrez une quantité minimal > 0';
    }
    return 'vous pouvez entrez la quantite minimal du piece';
  }

  getprixUnitaireErrorMessage() {
    return 'vous pouvez entrez la prix unitaire du piece';
  }

  getNumeroChambreErrorMessage(numeroCtrl:any) {
    if( numeroCtrl?.hasError('exist')){
      return 'vous pouvez entrez un nombre de chambre inexistante';
    }
    return 'vous pouvez entrez le numero du chambre';
  }

  getLocalErrorMessage() {
    return 'vous pouvez choisir un local';
  }

  getTypeErrorMessage() {
    return 'vous pouvez choisir un type de Reclamation';
  }

  getNumeroChambreChoiceErrorMessage() {

    return 'vous pouvez choisir le numero du chambre concerné';
  }


  getParentChoiceErrorMessage() {

    return 'vous pouvez choisir le parent du local concerné';
  }

  getTypeOtErrorMessage() {
    return "vous pouvez choisir un type d'ordre de travail";
  }
  getTempsEstimeMessage() {
    return "vous pouvez entrer un temps estimé valable";
  }

}
