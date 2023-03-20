import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../models/player.model';
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

  constructor(private readonly http: HttpClient) { }


  public findAllPlayers(): void {
    this._loading = true;
    this.http.get<Player[]>(APIGames + "/3/player")
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

  public getGamePlayers(): Observable<Player> {
    return this.http.get<Player>(`${APIGames}/3/player`);
  }

  


  updatePlayerState(playerId: number, propertyValue: any): Observable<Player> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${APIGames}/3/player/1`;
    const updatedFields = { ["state"]: propertyValue };
    console.log("UPDATE")
    return this.http.patch<Player>(url, updatedFields, { headers });
  }

  
}
