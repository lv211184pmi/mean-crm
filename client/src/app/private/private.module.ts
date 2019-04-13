import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatModule } from './components/chat/chat.module';
import { SharedModule } from '../core/shared/shared.module';
import { PrivateComponent } from './private.component';
import { PrivateRoutingModule } from './private-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterBtnComponent } from './components/footer-btn/footer-btn.component';
import { AnalystComponent } from './pages/analyst/analyst.component';
import { AssortmentComponent } from './pages/assortment/assortment.component';
import { CategoryFormComponent } from './pages/assortment/components/category-form/category-form.component';
import { PositionFormComponent } from './pages/assortment/components/position-form/position-form.component';
import { HistoryListComponent } from './pages/history/components/history-list/history-list.component';
import { HistoryFilterComponent } from './pages/history/components/history-filter/history-filter.component';
import { HistoryComponent } from './pages/history/history.component';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ChatModule,
  ],
  declarations: [
    PrivateComponent,
    OverviewComponent,
    SidebarComponent,
    FooterBtnComponent,
    AnalystComponent,
    AssortmentComponent,
    CategoryFormComponent,
    PositionFormComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    HistoryComponent,
  ],
})
export class PrivateModule {}
