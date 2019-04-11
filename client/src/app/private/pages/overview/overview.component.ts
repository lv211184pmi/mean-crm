import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';

import { AnalyticsService } from '../../../core/services/analytics/analytics.service';
import { Overview } from '../../../core/models/overview/overview.model';
import {
  MaterialInstance,
  MaterialService,
} from '../../../core/services/material-utils/material.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tapTarget') tapTargetRef: ElementRef;
  private tapTarget: MaterialInstance;
  public data$: Observable<Overview>;
  public yesterday = new Date();

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.data$ = this.analyticsService.getOverview();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngAfterViewInit() {
    // this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  ngOnDestroy() {
    if (this.tapTarget) {
      this.tapTarget.destroy();
    }
  }

  public openInfo() {
    // this.tapTarget.open();
  }
}
