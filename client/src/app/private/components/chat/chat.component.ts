import { Component, OnInit, Output } from '@angular/core';
import { Message } from '../../../core/models/chat/message.model';
import { DialogflowService } from '../../../core/services/chat/chatbot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public isChatOpen: boolean = false;
  public isMenuOpen: boolean = false;
  @Output() messages: Message[] = [];

  constructor(private bot: DialogflowService) {}

  ngOnInit() {}

  public sendMessage(content): void {
    const message = new Message({
      content: content.value,
      timestamp: new Date(),
    });
    this.messages.push(message);

    this.bot.getResponse(content.value).subscribe((res: any) => {
      console.log('res: ', res);
      this.messages.push(
        new Message({
          content: res.result.fulfillment.speech,
          timestamp: res.timestamp,
        }),
      );
    });
    content.value = '';
  }
}
