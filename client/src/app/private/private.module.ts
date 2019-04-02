import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { PrivateRoutingModule } from './private-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';

@NgModule({
  imports: [CommonModule, PrivateRoutingModule],
  declarations: [PrivateComponent, OverviewComponent],
})
export class PrivateModule {}
