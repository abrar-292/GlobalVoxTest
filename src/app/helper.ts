import {Injectable} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CSHelper {

  constructor() {
  }
  // tslint:disable-next-line:typedef
  spaceValidator(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
      return {required: true};
    } else {
      return null;
    }
  }
}
