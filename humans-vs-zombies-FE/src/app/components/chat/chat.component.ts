import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Chat } from 'src/app/models/chat.model';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { ChatService } from 'src/app/services/chat.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: []
})
export class ChatComponent implements OnInit {

  ngOnInit(): void {
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    this._player = StorageUtil.storageRead(StorageKeys.Player);
    this.chatService.findAllChats(game!.id, this._player);
  }
  public _player?: any = undefined;
  public _fractionChat: Chat[] = [];
  public _squadChat: Chat[] = [];

  get fractionChat(): Chat[] {
    return this.chatService.fractionChat;
  }

  get squadChat(): Chat[] {
    return this.chatService.squadChat;
  }

  get player(): any {
    return this._player;
  }

  public sendFractionMessage(newFractionMessage: string): void {
    this.chatService.addFractionMessage(newFractionMessage);
    if (this.chatService.error !== "") {
      alert(this.chatService.error);
      return;
    }
    window.location.reload();
  }

  constructor(private readonly chatService: ChatService) { }
}
