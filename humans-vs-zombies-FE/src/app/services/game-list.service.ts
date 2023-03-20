import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game.model';

const {APIGames} = environment;

@Injectable({
  providedIn: 'root'
})

export class GameListService {

  private _games: Game[] = [];
  private _error: string = "";
  private _loading: boolean = false;
  gameId: any = 0; 

  public get games(): Game[] {
    return this._games;
  }

  public get error(): string {
    return this._error;
  }

  public get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }

  public findAllGames(): void {
    this._loading = true;
    this.http.get<Game[]>(APIGames)
    .pipe(
      finalize(() => { //will run after last
        this._loading = false;
      })
    )
    .subscribe({
      next: (games: Game[]) => {
        this._games = games;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  public getGameById(id: any): Observable<Game> {
    return this.http.get<Game>(`${APIGames}/${id}`);
  }
}
