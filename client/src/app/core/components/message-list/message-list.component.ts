import { Component, Input } from '@angular/core';
import { Message } from '../../models/shared/message.model';

@Component({
  selector: 'app-message-list',
  template: `
    <div class="chatlist">
      <ul class="list-group">
        <app-message *ngFor="let msg of messages" [message]="msg"></app-message>
      </ul>
    </div>
  `,
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent {
  @Input() messages: Message[];
}
