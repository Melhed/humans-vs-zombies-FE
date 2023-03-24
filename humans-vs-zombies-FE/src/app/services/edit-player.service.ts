import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
import { StorageUtil } from '../utils/storage.util';
import { PlayerListService } from './player-list.service';
const {APIGames} = environment;

@Injectable({
  providedIn: 'root'
})
export class EditPlayerService {
  private _players: Player[] = [];
  private _error: string = "";
  private _loading: boolean = false;


  public get players(): Player[] {
    return this._players;
  }
  public get error(): string {
    return this._error;
  }

  public get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient,
  private readonly playerListService: PlayerListService) { }

  updateObjectProperty(playerId: number, stateValue: any) {
    const player: Player | undefined = this.playerListService.playerById(playerId);
    const currentGame: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    if(!player || !currentGame){
      throw new Error("updatePlayer: No player with Id: " + playerId);
    }
    player.state = stateValue.states;
    const url = `${APIGames}/${currentGame.id}/player/${playerId}`;
    return this.http.put(url, player).subscribe({
      next:(response: any) => {
        console.log("NEXT: ", response)
      },
      error:(error: HttpErrorResponse) => {
        console.log("ERROR: ", error.message);
      }
    });
  }
}
