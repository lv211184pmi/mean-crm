export class Order {
  date?: Date;
  order?: string;
  user?: string;
  list: OrderPosition[];
  _id?: string;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}

export class OrderPosition {
  name: string;
  quantity: number;
  cost: number;
  _id?: string;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}
