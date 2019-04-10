import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  MaterialService,
  MaterialInstance,
} from '../../../core/services/material-utils/material.service';
import { OrderHelperService } from '../../../core/services/order/order-helper.service';
import { OrderPosition, Order } from '../../../core/models/order/order.mode';
import { OrderService } from '../../../core/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, AfterViewInit, OnDestroy {
  public isRoot: boolean = true;
  public pending: boolean = false;
  private modal: MaterialInstance;
  private sub: Subscription;

  @ViewChild('modal') modalRef: ElementRef;
  constructor(
    private router: Router,
    private orderHelperService: OrderHelperService,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public get orderList(): OrderPosition[] {
    return this.orderHelperService.list;
  }

  public get total(): number {
    return this.orderHelperService.total;
  }

  public removePosition(position: OrderPosition) {
    this.orderHelperService.remove(position);
  }

  public openModal() {
    this.modal.open();
  }

  public cancel() {
    this.modal.close();
  }

  public submit() {
    this.pending = true;
    const order: Order = {
      list: this.orderHelperService.list.map(({ name, cost, quantity }) => ({
        name,
        cost,
        quantity,
      })),
    };

    this.sub = this.orderService
      .createOrder(order)
      .subscribe(() => this.orderHelperService.clear(), null, () => {
        this.modal.close();
        this.pending = false;
      });
  }
}
