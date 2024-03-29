import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Chat } from '../models/chat.model';
import { environment } from 'src/environments/environment';
import { StorageUtil } from '../utils/storage.util';
import { Game } from '../models/game.model';
import { BehaviorSubject } from 'rxjs';
import { SquadListService } from './squad-list.service';
import { Squad } from '../models/squad.model';

const { APIGames } = environment;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private readonly http: HttpClient,
    private readonly squadService: SquadListService
  ) {}

  private _adminChat$ = new BehaviorSubject<Chat[]>([]);
  adminChat = this._adminChat$.asObservable();

  private _globalChat$ = new BehaviorSubject<Chat[]>([]);
  globalChat = this._globalChat$.asObservable();

  private _factionChat$ = new BehaviorSubject<Chat[]>([]);
  factionChat = this._factionChat$.asObservable();

  private _squadChat$ = new BehaviorSubject<Chat[]>([]);
  squadChat = this._squadChat$.asObservable();

  private _error: string = '';

  public get error(): string {
    return this._error;
  }

  private _activeChat: string = '';

  public get activeChat() {
    return this._activeChat;
  }

  public set activeChat(activeChat: string) {
    this._activeChat = activeChat;
  }

  private updateAdminChat(chats: Chat[]) {
    this._adminChat$.next(chats);
  }

  private updateGlobalChat(chats: Chat[]) {
    this._globalChat$.next(chats);
  }

  private updateFactionChat(chats: Chat[]) {
    this._factionChat$.next(chats);
  }

  private updateSquadChat(chats: Chat[]) {
    this._squadChat$.next(chats);
  }

  public findAllChats(game: Game, player: any, squad: Squad): void {
    this.findGlobalAndFactionChat(game.id, player.human);
    if (squad !== undefined) this.findSquadChat(game.id, squad);
  }

  private findGlobalAndFactionChat(
    gameId: number | undefined,
    playerIsHuman: boolean
  ): void {
    this.http.get<Chat[]>(`${APIGames}/${gameId}/chat`).subscribe({
      next: (chat: Chat[]) => {
        this.updateAdminChat(chat);
        const globalMessages: Chat[] = [];
        const factionMessages: Chat[] = [];
        chat.map((message: any) => {
          if (
            message.humanGlobal &&
            message.zombieGlobal &&
            message.squadId == null
          ) {
            globalMessages.push(message);
          } else if (
            (playerIsHuman && message.humanGlobal && message.squadId == null) ||
            (!playerIsHuman && message.zombieGlobal && message.squadId == null)
          ) {
            factionMessages.push(message);
          }
        });
        if (this.activeChat == 'GLOBAL') {
          this.updateFactionChat(factionMessages);
          this.updateGlobalChat(globalMessages);
        } else {
          this.updateGlobalChat(globalMessages);
          this.updateFactionChat(factionMessages);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      },
    });
  }

  private findSquadChat(gameId: number | undefined, squad: Squad): void {
    this.http
      .get<Chat[]>(`${APIGames}/${gameId}/squad/${squad.id}/chat`)
      .subscribe({
        next: (chat: Chat[]) => {
          this.updateSquadChat(chat);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.message);
        },
      });
  }

  addMessage(newMessage: string): void {
    const player: any = StorageUtil.storageRead(StorageKeys.Player);
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    const squad: Squad | undefined = StorageUtil.storageRead(StorageKeys.Squad);
    const current = new Date();
    let chatDTO: Object = {};
    let url = `${APIGames}/${game?.id}/chat`;
    switch (this._activeChat) {
      case 'GLOBAL':
        chatDTO = {
          id: null,
          message: newMessage,
          timestamp: current.getTime(),
          isHumanGlobal: true,
          isZombieGlobal: true,
          playerId: player.id,
          gameId: game?.id,
          squadId: null,
        };
        break;
      case 'FACTION':
        chatDTO = {
          id: null,
          message: newMessage,
          timestamp: current.getTime(),
          isHumanGlobal: player.human,
          isZombieGlobal: !player.human,
          playerId: player.id,
          gameId: game?.id,
          squadId: null,
        };
        break;
      case 'SQUAD':
        chatDTO = {
          id: null,
          message: newMessage,
          timestamp: current.getTime(),
          isHumanGlobal: player.human,
          isZombieGlobal: !player.human,
          playerId: player.id,
          gameId: game?.id,
          squadId: squad?.id,
        };
        url = `${APIGames}/${game?.id}/squad/${squad?.id}/chat`;
        break;
    }
    this.http.post<Chat>(url, chatDTO).subscribe({
      next: () => {
        if (this._activeChat === 'SQUAD') {
          this.findSquadChat(game!.id, squad!);
        } else {
          this.findGlobalAndFactionChat(game!.id, player.human);
        }
      },
      error: (err: HttpErrorResponse) => {
        this._error = err.message;
      },
    });
  }
}
