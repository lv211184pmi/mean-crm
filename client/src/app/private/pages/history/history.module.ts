import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HistoryComponent } from './history.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { HistoryFilterComponent } from './components/history-filter/history-filter.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HistoryComponent }]),
  ],
  declarations: [
    // HistoryListComponent,
    // HistoryFilterComponent,
    // HistoryComponent,
  ],
})
export class HistoryModule {}
