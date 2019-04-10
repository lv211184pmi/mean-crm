import { Injectable } from '@angular/core';
import { Position } from '../../models/assortment/position.model';
import { OrderPosition } from '../../models/order/order.mode';

@Injectable({ providedIn: 'root' })
export class OrderHelperService {
  public list: OrderPosition[] = [];
  public total: number = 0;

  public add({ name, cost, quantity, _id }: Position) {
    const candidate = this.list.find(p => p._id === _id);

    const orderPosition: OrderPosition = Object.assign(
      {},
      { name, cost, quantity, _id },
    );

    if (candidate) {
      candidate.quantity += quantity;
    } else {
      this.list.push(orderPosition);
    }
    this.computePrice();
  }

  public remove(position: OrderPosition) {
    const index = this.list.findIndex(i => i._id === position._id);
    this.list.splice(index, 1);
    this.computePrice();
  }

  public clear() {
    this.list = [];
    this.total = 0;
  }

  private computePrice(): number {
    return (this.total = this.list.reduce((acc, cur) => {
      return acc + cur.quantity * cur.cost;
    }, 0));
  }
}
