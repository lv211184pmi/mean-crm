export class Overview {
  orders: OverviewItem;
  gain: OverviewItem;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}

declare interface OverviewItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
}
