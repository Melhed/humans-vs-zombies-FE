import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Chat } from 'src/app/models/chat.model';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { Squad } from 'src/app/models/squad.model';
import { ChatService } from 'src/app/services/chat.service';
import { PlayerService } from 'src/app/services/player.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [],
})
export class ChatComponent implements AfterViewInit, OnInit {
  public _player?: any = undefined;
  public _chats: Chat[] = [];
  public game: Game | undefined = undefined;
  public squad: Squad | undefined = undefined;
  public globalColor = 'red';
  public factionColor = 'black';
  public squadColor = 'black';
  public newMessage = '';

  constructor(
    private readonly chatService: ChatService,
    private readonly playerService: PlayerService
  ) {
    this.game = StorageUtil.storageRead(StorageKeys.Game);
    this.squad = StorageUtil.storageRead(StorageKeys.Squad);
    this._player = StorageUtil.storageRead(StorageKeys.Player);
  }

  ngOnInit(): void {

    this._player = StorageUtil.storageRead(StorageKeys.Player);
  }

  ngAfterViewInit(): void {
    if(this._player !== null) {
      this.fetchChat();
      this.chatService.globalChat.subscribe((chats: Chat[]) => {
        this._chats = chats;
      });
      this.chatService.activeChat = 'GLOBAL';
    }
  }

  fetchChat(): void {
    this.chatService.findAllChats(
      StorageUtil.storageRead(StorageKeys.Game)!,
      StorageUtil.storageRead(StorageKeys.Player),
      StorageUtil.storageRead(StorageKeys.Squad)!
    );
  }

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
    this.chatService.activeChat = 'GLOBAL';
    this.chatService.globalChat.subscribe((chats: Chat[]) => {
      this._chats = chats;
    });
  }

  public getFactionChats() {
    this.globalColor = 'black';
    this.factionColor = 'red';
    this.squadColor = 'black';
    this.chatService.activeChat = 'FACTION';
    this.chatService.factionChat.subscribe((chats: Chat[]) => {
      this._chats = chats;
    });
  }

  public getSquadChats() {
    this.globalColor = 'black';
    this.factionColor = 'black';
    this.squadColor = 'red';
    this.chatService.activeChat = 'SQUAD';
    this.chatService.squadChat.subscribe((chats: Chat[]) => {
      this._chats = chats;
    });
  }

  public sendMessage(newMessage: string): void {
    this.chatService.addMessage(newMessage);

    if (this.chatService.error !== '') {
      alert(this.chatService.error);
      return;
    }
  }
}
