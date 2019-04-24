import { Component, Output } from '@angular/core';
import { Message } from '../../../core/models/chat/message.model';
import { DialogflowService } from '../../../core/services/chat/chatbot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  public isChatOpen: boolean = false;
  public isMenuOpen: boolean = false;
  @Output() messages: Message[] = [];

  constructor(private bot: DialogflowService) {}

  public onKeyPress(content: HTMLInputElement, event: KeyboardEvent): void {
    if (event && event.keyCode === 13) {
      this.sendMessage(content);
    }
  }

  public sendMessage(content: HTMLInputElement): void {
    const message = new Message({
      content: content.value,
      timestamp: new Date(),
      isOwn: true,
    });
    this.messages.push(message);

    this.bot
      .getResponse(content.value)
      .subscribe((msg: Message) => this.messages.push(msg));

    content.value = '';
  }
}
