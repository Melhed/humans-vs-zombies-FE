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
      finalize(() => { //will run after last
        this._loading = false;
      })
    )
    .subscribe({
      next: (players: Player[]) => {
        this._players = players;
        console.log("players " + this._players);
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  public playerById(id: number): Player | undefined{
    return this._players.find((player: Player) => {console.log("playerById " + player.playerId)
    1 === id});
  }

  public findPlayerById(playerId: any): Observable<any>{
    this._loading = true;
    return this.http.get<Player[]>(`${APIGames}/${localStorage.getItem('game-id')}/player/${playerId}`)
    
  }


  
}
