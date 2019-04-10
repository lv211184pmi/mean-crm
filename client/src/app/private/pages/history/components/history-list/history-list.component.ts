import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { Order } from '../../../../../core/models/order/order.mode';
import {
  MaterialInstance,
  MaterialService,
} from '../../../../../core/services/material-utils/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {
  private modal: MaterialInstance;
  public selectedOrder: Order;

  @ViewChild('modal') modalRef: ElementRef;
  @Input() orders: Order[] = [];

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  public computePrice(order: Order): number {
    return order.list.reduce((acc, cur) => {
      return (acc += cur.cost * cur.quantity);
    }, 0);
  }

  public selectOrder(order: Order) {
    this.selectedOrder = order;
    this.modal.open();
  }

  public cancel() {
    this.modal.close();
  }
}
