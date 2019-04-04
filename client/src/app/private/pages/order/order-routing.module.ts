import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderComponent } from './order.component';
import { OrderCategoriesComponent } from './components/order-categories/order-categories.component';
import { OrderPositionsComponent } from './components/order-positions/order-positions.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'categories',
      },
      {
        path: 'categories',
        component: OrderCategoriesComponent,
      },
      {
        path: 'positions',
        component: OrderPositionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
