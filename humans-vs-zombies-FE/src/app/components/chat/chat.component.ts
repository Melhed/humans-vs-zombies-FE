import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Chat } from 'src/app/models/chat.model';
import { Game } from 'src/app/models/game.model';
import { Squad } from 'src/app/models/squad.model';
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
    const squad: Squad | undefined = StorageUtil.storageRead(StorageKeys.Squad);
    this.chatService.findAllChats(game!.id, this._player, squad!);
    this.chatService.globalChat.subscribe((chats: Chat[]) => {
      if (chats[0])
        this._chats = chats;
    });
  }

  public _player?: any = undefined;
  public _chats: Chat[] = [];
  private activeChat: string = "GLOBAL";
  public globalColor = 'red';
  public factionColor = 'black';
  public squadColor = 'black';
  public newMessage = "";

  get chats(): Chat[] {
    return this._chats;
  }

  get player(): any {
    return this._player;
  }

  public getGlobalChats() {
    this.globalColor = 'red';
    this.factionColor = 'black';
    this.squadColor = 'black';
    this.activeChat = "GLOBAL";
    this.chatService.globalChat.subscribe((chats: Chat[]) => {
      this._chats = chats;
    });
  }

  public getFactionChats() {
    this.globalColor = 'black';
    this.factionColor = 'red';
    this.squadColor = 'black';
    this.activeChat = "FACTION";
    this.chatService.factionChat.subscribe((chats: Chat[]) => {
      this._chats = chats;
    });
  }

  public getSquadChats() {
    this.globalColor = 'black';
    this.factionColor = 'black';
    this.squadColor = 'red';
    this.activeChat = "SQUAD";
    this.chatService.squadChat.subscribe((chats: Chat[]) => {
      this._chats = chats;
    });
    console.log(this._chats);

  }

  public sendMessage(newMessage: string): void {
    this.chatService.addMessage(newMessage, this.activeChat);

    if (this.chatService.error !== "") {
      alert(this.chatService.error);
      return;
    }
  }

  constructor(private readonly chatService: ChatService) { }
}
