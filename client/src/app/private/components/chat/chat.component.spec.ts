import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ChatComponent } from './chat.component';
import { MessageListComponent } from '../../../core/components/message-list/message-list.component';
import { DialogflowService } from './../../../core/services/chat/chatbot.service';
import { MessageComponent } from './../../../core/components/message/message.component';
import { Message } from '../../../core/models/chat/message.model';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let de: DebugElement;
  let service: DialogflowService;
  let spy: jasmine.Spy;
  let message: Message;
  let btn: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ChatComponent, MessageListComponent, MessageComponent],
      providers: [DialogflowService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(DialogflowService);
    message = { content: 'test', timestamp: new Date() };
    spy = spyOn(service, 'getResponse').and.returnValue(of(message));

    fixture.detectChanges();
  });

  afterEach(() => {
    component.messages = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sendMessage after key press', () => {
    component.onKeyPress(
      { value: 'hi' } as HTMLInputElement,
      { keyCode: 13 } as KeyboardEvent,
    );
    expect(spy.calls.all().length).toEqual(1);
  });

  it('should not call sendMessage after key press', () => {
    component.onKeyPress(
      { value: 'hi' } as HTMLInputElement,
      { keyCode: 12 } as KeyboardEvent,
    );
    expect(spy.calls.all().length).toEqual(0);
  });

  it('should create two messages', () => {
    expect(component.messages.length).toEqual(0);
    component.sendMessage({ value: 'hi' } as HTMLInputElement);
    expect(component.messages.length).toEqual(2);
  });

  it('should click on chat button', () => {
    btn = de.query(By.css('.open-chat')).nativeElement;

    expect(component.isChatOpen).toBeFalsy();
    btn.click();
    expect(component.isChatOpen).toBeTruthy();
  });
});
