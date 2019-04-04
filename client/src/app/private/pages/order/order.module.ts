import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../../../core/shared/shared.module';
import { OrderComponent } from './order.component';
import { OrderCategoriesComponent } from './components/order-categories/order-categories.component';
import { OrderPositionsComponent } from './components/order-positions/order-positions.component';

@NgModule({
  imports: [CommonModule, RouterModule, OrderRoutingModule, SharedModule],
  declarations: [
    OrderComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
  ],
})
export class OrderModule {}
