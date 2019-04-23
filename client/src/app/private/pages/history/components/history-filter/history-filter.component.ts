import {
  Component,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Filter } from '../../../../../core/models/shared/filter.model';
import {
  MaterialDatepicker,
  MaterialService,
} from '../../../../../core/services/material-utils/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
})
export class HistoryFilterComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() clearFilter: Observable<void> = new Observable(null);
  @Output() emitFilter: EventEmitter<Filter> = new EventEmitter();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  public order: number;
  public isValid: boolean = true;
  private sub: Subscription;
  private start: MaterialDatepicker;
  private end: MaterialDatepicker;

  ngOnInit() {
    this.sub = this.clearFilter.subscribe(() => this.cleanFilter());
  }

  ngAfterViewInit() {
    this.start = MaterialService.initDatepicker(
      this.startRef,
      this.validate.bind(this),
    );
    this.end = MaterialService.initDatepicker(
      this.endRef,
      this.validate.bind(this),
    );
  }

  ngOnDestroy() {
    this.start.destroy();
    this.end.destroy();

    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }
    return (this.isValid = this.start.date < this.end.date);
  }

  public submitFilter() {
    const filter: Filter = {};

    if (this.order) {
      filter.order = this.order;
    }
    if (this.start.date) {
      filter.start = this.start.date;
    }
    if (this.end.date) {
      filter.end = this.end.date;
    }

    this.emitFilter.emit(filter);
  }

  private cleanFilter() {
    this.order = undefined;
    this.startRef.nativeElement.value = null;
    this.endRef.nativeElement.value = null;
    this.start.date = undefined;
    this.start.date = undefined;
    MaterialService.updateTextInputs();
  }
}
