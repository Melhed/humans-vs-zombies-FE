import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../models/player.model';
const {APIGames} = environment;

@Injectable({
  providedIn: 'root'
})
export class EditPlayerService {
  private _player: Player[] = [];
  private _error: string = "";
  private _loading: boolean = false;


  public get players(): Player[] {
    return this._player;
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
        this._player = players;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }
}
