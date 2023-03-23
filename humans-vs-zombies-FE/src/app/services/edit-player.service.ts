import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Player } from '../models/player.model';
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
    if(!player){
      throw new Error("updatePlayer: No player with Id: " + playerId);
    }
    player.state = stateValue.states;
    const url = `${APIGames}/${localStorage.getItem('game-id')}/player/${playerId}`;
    return this.http.put(url, player).subscribe({
      next:(response: any) => {
        console.log("NEXT: ", response)
      },
      error:(error: HttpErrorResponse) => {
        console.log("ERROR: ", error.message);
      }
      
    });;
  }
}
