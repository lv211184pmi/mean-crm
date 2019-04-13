import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { AnalyticsService } from '../../../core/services/analytics/analytics.service';
import { Analytics } from '../../../core/models/analytics/analytics.model';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analyst',
  templateUrl: './analyst.component.html',
  styleUrls: ['./analyst.component.scss'],
})
export class AnalystComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;
  private sub: Subscription;

  public average: number;
  public pending: boolean = true;

  constructor(private analyticsService: AnalyticsService) {}

  ngAfterViewInit() {
    this.sub = this.analyticsService
      .getAnalytics()
      .subscribe((data: Analytics) => {
        this.average = data.average;
        this.createGainChart(data);
        this.createOrderChart(data);
        this.pending = false;
      });
  }

  private createGainChart(data) {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)',
    };

    gainConfig.labels = data.chart.map(item => item.label);
    gainConfig.data = data.chart.map(item => item.gain);

    // **** temp ****
    gainConfig.labels.push('09.04.2019');
    gainConfig.data.push(200);
    // **** temp ****

    const gainCtx = this.gainRef.nativeElement.getContext('2d');
    gainCtx.canvas.height = '300px';
    const gainChart = new Chart(gainCtx, createChartConfig(gainConfig));
  }

  private createOrderChart(data) {
    const orderConfig: any = {
      label: 'Order',
      color: 'rgb(54, 162, 235)',
    };

    orderConfig.labels = data.chart.map(item => item.label);
    orderConfig.data = data.chart.map(item => item.order);

    // **** temp ****
    orderConfig.labels.push('09.04.2019');
    orderConfig.data.push(200);
    // **** temp ****

    const orderCtx = this.orderRef.nativeElement.getContext('2d');
    orderCtx.canvas.height = '300px';
    const orderChart = new Chart(orderCtx, createChartConfig(orderConfig));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

function createChartConfig({ labels, data, label, color }) {
  return {
    type: 'line',
    options: {
      responsive: true,
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false,
        },
      ],
    },
  };
}
