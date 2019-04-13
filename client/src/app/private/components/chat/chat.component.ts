import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public isChatOpen: boolean = false;
  public isMenuOpen: boolean = false;

  constructor() {}

  ngOnInit() {}
}
