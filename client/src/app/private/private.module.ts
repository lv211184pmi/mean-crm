import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateComponent } from './private.component';
import { PrivateRoutingModule } from './private-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterBtnComponent } from './components/footer-btn/footer-btn.component';
import { AnalystComponent } from './pages/analyst/analyst.component';
import { HistoryComponent } from './pages/history/history.component';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { AssortmentComponent } from './pages/assortment/assortment.component';

@NgModule({
  imports: [CommonModule, PrivateRoutingModule],
  declarations: [PrivateComponent, OverviewComponent, SidebarComponent, FooterBtnComponent, AnalystComponent, HistoryComponent, AddOrderComponent, AssortmentComponent],
})
export class PrivateModule {}
