import { ElementRef } from '@angular/core';

declare const M;

export class MaterialService {
  static alert(message: string = 'Something went wrong!') {
    M.toast({ html: message });
  }

  static initFloatingBtn(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static updateTextInputs() {
    M.updateTextFields();
  }
}
