import { ElementRef } from '@angular/core';

declare const M;

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

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

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement);
  }

  static initTooltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement);
  }
}
