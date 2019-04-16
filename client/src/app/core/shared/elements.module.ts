import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageComponent } from './../components/message/message.component';
import { MessageListComponent } from './../components/message-list/message-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MessageComponent, MessageListComponent],
  exports: [MessageComponent, MessageListComponent],
})
export class ElementsModule {}
