import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import {
  MaterialInstance,
  MaterialService,
} from '../../../core/services/material-utils/material.service';
import { OrderService } from '../../../core/services/order/order.service';
import { Order } from '../../../core/models/order/order.mode';
import { Filter } from '../../../core/models/shared/filter.model';

const STEP = 2;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  private cleanFilter: Subject<void> = new Subject();
  private tooltipOpen: MaterialInstance;
  private tooltipClear: MaterialInstance;
  private sub: Subscription;
  private filter: Filter = {};
  private offset = 0;
  private limit = STEP;

  public isFilterVisible: boolean = false;
  public noMoreOrders: boolean = false;
  public loading: boolean = false;
  public reloading: boolean = false;
  public orders: Order[] = [];

  @ViewChild('tooltipOpen') tooltipOpenRef: ElementRef;
  @ViewChild('tooltipClear') tooltipClearRef: ElementRef;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.reloading = true;
    this.getOrders();
  }

  ngAfterViewInit() {
    this.tooltipOpen = MaterialService.initTooltip(this.tooltipOpenRef);
  }

  ngOnDestroy() {
    if (this.tooltipClear) {
      this.tooltipClear.destroy();
    }
    this.tooltipOpen.destroy();
    this.sub.unsubscribe();
  }

  public onClearFilter() {
    return this.cleanFilter.asObservable();
  }

  private getOrders() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit,
    });
    this.sub = this.orderService.getOrder(params).subscribe(
      (orders: Order[]) => {
        this.orders = [...this.orders, ...orders];
        this.noMoreOrders = orders.length < STEP;
        if (this.isFiltered()) {
          this.tooltipClear = MaterialService.initTooltip(this.tooltipClearRef);
        }
      },
      null,
      () => {
        this.loading = false;
        this.reloading = false;
      },
    );
  }

  public loadMore() {
    this.loading = true;
    this.offset += STEP;
    this.getOrders();
  }

  public isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }

  public applyFilter(filter: Filter) {
    this.filter = filter;
    this.orders = [];
    this.offset = 0;
    this.reloading = true;
    this.getOrders();
  }

  public clearFilter() {
    this.cleanFilter.next();
    this.applyFilter({});
  }
}
