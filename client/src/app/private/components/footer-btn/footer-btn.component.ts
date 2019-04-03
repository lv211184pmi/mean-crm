import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MaterialService } from '../../../core/services/material-utils/material.service';

@Component({
  selector: 'app-footer-btn',
  templateUrl: './footer-btn.component.html',
  styleUrls: ['./footer-btn.component.scss'],
})
export class FooterBtnComponent implements AfterViewInit {
  @ViewChild('floating') floatingBtn: ElementRef;
  constructor() {}

  ngAfterViewInit() {
    MaterialService.initFloatingBtn(this.floatingBtn);
  }
}
