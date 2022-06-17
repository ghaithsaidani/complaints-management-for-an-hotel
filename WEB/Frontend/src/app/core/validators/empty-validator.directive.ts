import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
  selector: '[appEmptyValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmptyValidatorDirective, multi: true}]
})
export class EmptyValidatorDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (control.value=='' || control.value==[] || control.value==undefined) {
      return {'empty': true};
    }
    return null;
  }

}
