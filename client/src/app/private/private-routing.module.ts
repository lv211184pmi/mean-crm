import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateComponent } from './private.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { AnalystComponent } from './pages/analyst/analyst.component';
import { HistoryComponent } from './pages/history/history.component';
import { AssortmentComponent } from './pages/assortment/assortment.component';
import { CategoryFormComponent } from './pages/assortment/components/category-form/category-form.component';

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
        path: 'order',
        loadChildren: './pages/order/order.module#OrderModule',
      },
      {
        path: 'categories',
        component: AssortmentComponent,
      },
      {
        path: 'categories/new',
        component: CategoryFormComponent,
      },
      {
        path: 'categories/:id',
        component: CategoryFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
