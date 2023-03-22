import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Chat } from '../models/chat.model';
import { Player } from '../models/player.model';
import { environment } from 'src/environments/environment';
import { StorageUtil } from '../utils/storage.util';
import { Game } from '../models/game.model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'ol';

const {APIGames} = environment;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private readonly http: HttpClient) { }

  private _globalChat$ = new BehaviorSubject<Chat[]>([]);
  globalChat = this._globalChat$.asObservable();

  private _factionChat$ = new BehaviorSubject<Chat[]>([]);
  factionChat = this._factionChat$.asObservable();

  private _squadChat$ = new BehaviorSubject<Chat[]>([]);
  squadChat = this._squadChat$.asObservable();

  private _error: string = "";

  public get error(): string {
    return this._error;
  }

  private updateGlobalChat(chats: Chat[]) {
    this._globalChat$.next(chats);
  }

  private updateFactionChat(chats: Chat[]) {
    this._factionChat$.next(chats);
  }

  public findAllChats(gameId: number | undefined, player: any): void {
    this.findGlobalAndFactionChat(gameId, player.human);
  }

  private findGlobalAndFactionChat(gameId: number | undefined, playerIsHuman: boolean): void {
    this.http.get<Chat[]>(`${APIGames}/${gameId}/chat`)
    .subscribe({
      next: (chat: Chat[]) => {
        const globalMessages: Chat[] = [];
        const factionMessages: Chat[] = [];
        chat.map((message: any) => {
          if (message.humanGlobal && message.zombieGlobal)
            globalMessages.push(message);
          else if (playerIsHuman && message.humanGlobal || !playerIsHuman && message.zombieGlobal)
            factionMessages.push(message);
        })
        this.updateGlobalChat(globalMessages);
        this.updateFactionChat(factionMessages);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    });
  }

  addMessage(newMessage: string, type: string): void {
    const player: any = StorageUtil.storageRead(StorageKeys.Player);
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    const current = new Date();
    let chatDTO: Object = {};
    switch (type) {
      case "GLOBAL":
        chatDTO = {
          id: null,
          message: newMessage,
          timestamp: current.getTime(),
          isHumanGlobal: true,
          isZombieGlobal: true,
          playerId: player.id,
          gameId: game?.id,
          squadId: null
        }
      break;
      case "FACTION":
        chatDTO = {
          id: null,
          message: newMessage,
          timestamp: current.getTime(),
          isHumanGlobal: player.human,
          isZombieGlobal: !player.human,
          playerId: player.id,
          gameId: game?.id,
          squadId: null
        }
      break;
      case "SQUAD":
        chatDTO = {
          id: null,
          message: newMessage,
          timestamp: current.getTime(),
          isHumanGlobal: player.human,
          isZombieGlobal: !player.human,
          playerId: player.id,
          gameId: game?.id,
          squadId: null
        }
      break;
    }

    this.http.post<Chat>(`${APIGames}/${game?.id}/chat`, chatDTO)
      .subscribe({
        next: () => {
          this.findAllChats(game?.id, player);
        },
        error: (err: HttpErrorResponse) => {
          this._error = err.message;
        }
      });
  }
}
