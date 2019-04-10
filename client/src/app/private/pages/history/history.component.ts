import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import {
  MaterialInstance,
  MaterialService,
} from '../../../core/services/material-utils/material.service';
import { OrderService } from '../../../core/services/order/order.service';
import { Order } from '../../../core/models/order/order.mode';

const STEP = 2;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  private tooltip: MaterialInstance;
  private sub: Subscription;
  private offset = 0;
  private limit = STEP;

  public isFilterVisible: boolean = false;
  public noMoreOrders: boolean = false;
  public loading: boolean = false;
  public reloading: boolean = false;
  public orders: Order[] = [];

  @ViewChild('tooltip') tooltipRef: ElementRef;
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.reloading = true;
    this.getOrders();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.sub.unsubscribe();
  }

  private getOrders() {
    const params = {
      offset: this.offset,
      limit: this.limit,
    };
    this.sub = this.orderService.getOrder(params).subscribe(
      (orders: Order[]) => {
        this.orders = [...this.orders, ...orders];
        this.noMoreOrders = orders.length < STEP;
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
}
