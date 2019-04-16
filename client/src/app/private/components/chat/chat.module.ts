import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementsModule } from '../../../core/shared/elements.module';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [CommonModule, ElementsModule],
  declarations: [ChatComponent],
  exports: [ChatComponent],
})
export class ChatModule {}
