export class Analytics {
  average: number;
  chart: AnalyticsChart[];

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}

declare interface AnalyticsChart {
  gain: number;
  order: number;
  label: string;
}
