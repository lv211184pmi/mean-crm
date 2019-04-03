import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateComponent } from './private.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { AnalystComponent } from './pages/analyst/analyst.component';
import { HistoryComponent } from './pages/history/history.component';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { AssortmentComponent } from './pages/assortment/assortment.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'analyst',
        component: AnalystComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'add-order',
        component: AddOrderComponent,
      },
      {
        path: 'categories',
        component: AssortmentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
