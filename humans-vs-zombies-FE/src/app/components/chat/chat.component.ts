import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: []
})
export class ChatComponent implements OnInit {

  ngOnInit(): void {
    this.chatService.findAllChats();
  }

  public _fractionChat: Chat[] = [];
  public _squadChat: Chat[] = [];

  get fractionChat(): Chat[] {
    return this.chatService.fractionChat;
  }

  get squadChat(): Chat[] {
    return this.chatService.squadChat;
  }

  constructor(private readonly chatService: ChatService) { }
}
