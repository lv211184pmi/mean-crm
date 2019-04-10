import { ElementRef } from '@angular/core';

declare const M;

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export interface MaterialDatepicker extends MaterialInstance {
  date?: Date;
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

  static initDatepicker(
    ref: ElementRef,
    onClose: () => void,
  ): MaterialDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      autoClose: true,
      onClose,
    });
  }
}
