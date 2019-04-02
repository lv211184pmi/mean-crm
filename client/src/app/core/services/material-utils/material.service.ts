import { ElementRef } from '@angular/core';

declare const M;

export class MaterialService {
  static alert(message: string) {
    M.toast({ html: message });
  }

  static initFloatingBtn(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement);
  }
}
