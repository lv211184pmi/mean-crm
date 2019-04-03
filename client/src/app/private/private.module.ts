import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrivateComponent } from './private.component';
import { PrivateRoutingModule } from './private-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterBtnComponent } from './components/footer-btn/footer-btn.component';
import { AnalystComponent } from './pages/analyst/analyst.component';
import { HistoryComponent } from './pages/history/history.component';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { AssortmentComponent } from './pages/assortment/assortment.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CategoryFormComponent } from './pages/assortment/components/category-form/category-form.component';
import { PositionFormComponent } from './pages/assortment/components/position-form/position-form.component';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PrivateComponent,
    OverviewComponent,
    SidebarComponent,
    FooterBtnComponent,
    AnalystComponent,
    HistoryComponent,
    AddOrderComponent,
    AssortmentComponent,
    LoaderComponent,
    CategoryFormComponent,
    PositionFormComponent,
  ],
})
export class PrivateModule {}
