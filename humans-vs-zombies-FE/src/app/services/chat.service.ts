import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Chat } from '../models/chat.model';
import { Player } from '../models/player.model';
import { environment } from 'src/environments/environment';
import { StorageUtil } from '../utils/storage.util';

const { APIGames } = environment;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _fractionChat: Chat[] = [];
  private _squadChat: Chat[] = [];

  public get fractionChat(): Chat[] {
    return this._fractionChat;
  }

  public get squadChat(): Chat[] {
    return this._squadChat;
  }

  constructor(private readonly http: HttpClient) {}

  public findAllChats(): void {
    // const gameId: any = sessionStorage.getItem('game-id');
    // const player: any = StorageUtil.storageRead(StorageKeys.Player);
    // console.log(player);
    // this.http.get<Chat[]>(`${APIGames}/${gameId}/chat?player-is-human=${player.human}`)
    // .subscribe({
    //   next: (chat: Chat[]) => {
    //     this._fractionChat = chat;
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     console.log(err.message);
    //   }
    // })
  }
}
