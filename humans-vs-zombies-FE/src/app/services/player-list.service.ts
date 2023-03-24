import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../models/player.model';
const {APIGames} = environment;

@Injectable({
  providedIn: 'root'
})
export class PlayerListService {

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
  
  constructor(private readonly http: HttpClient) { }
  public findAllPlayers(): void {
    this._loading = true;
    this.http.get<Player[]>(`${APIGames}/${localStorage.getItem('game-id')}/player`)
    .pipe(
      finalize(() => { 
        this._loading = false;
      })
    )
    .subscribe({
      next: (players: Player[]) => {
        this._players = players;
        console.log("All player : ", this._players);
        console.log("******  " , this._players.find(player => player.id === 1));
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }
  public playerById(id: number): Player | undefined{
    return this._players.find(player => player.id === id);
  }
}
