import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Chat } from '../models/chat.model';
import { Player } from '../models/player.model';
import { environment } from 'src/environments/environment';
import { StorageUtil } from '../utils/storage.util';
import { Game } from '../models/game.model';

const {APIGames} = environment;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _fractionChat: Chat[] = [];
  private _squadChat: Chat[] = [];
  private _error: string = "";

  public get fractionChat(): Chat[] {
    return this._fractionChat;
  }

  public get squadChat(): Chat[] {
    return this._squadChat;
  }

  public get error(): string {
    return this._error;
  }


  constructor(private readonly http: HttpClient) { }

  public findAllChats(gameId: number | undefined, player: any): void {
    this.findFractionChat(gameId, player.human);
    console.log(player);
  }

  private findFractionChat(gameId: number | undefined, playerIsHuman: boolean): void {
    this.http.get<Chat[]>(`${APIGames}/${gameId}/chat`)
    .subscribe({
      next: (chat: Chat[]) => {
        chat.map((message: any) => {
          if (playerIsHuman && message.humanGlobal || !playerIsHuman && message.zombieGlobal)
          this._fractionChat.push(message);
        })
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    });
  }

  addFractionMessage(newFractionMessage: string) {
    const player: any = StorageUtil.storageRead(StorageKeys.Player);
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    const current = new Date();
    const chatDTO = {
      id: null,
      message: newFractionMessage,
      timestamp: current.getTime(),
      isHumanGlobal: player.human,
      isZombieGlobal: !player.human,
      playerId: player.id,
      gameId: game?.id,
      squadId: null
    }
    this.http.post<Chat>(`${APIGames}/${game?.id}/chat`, chatDTO)
      .subscribe({
        next: () => {
          console.log("Message added");
        },
        error: (err: HttpErrorResponse) => {
          this._error = err.message;
        }
      });
  }
}
