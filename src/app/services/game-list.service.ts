import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';

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
        this.setNoPlayers();
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

  private setNoPlayers() {
    const games: Game[] = [];
    this._games.map((game: Game) => {
      this.http.get<Player[]>(`${APIGames}/${game.id}/player`)
        .pipe(
          finalize(() => {
            this._loading = false;
          })
        )
        .subscribe({
          next: (players: Player[]) => {
            game.registeredPlayers = players.length;
          },
          error: (error: HttpErrorResponse) => {
            this._error = error.message;
          }
        })
      games.push(game);
    })
    this._games = games;
  }

  public gameById(): Game | undefined{
    return this._games.find(game => game.id === Number(localStorage.getItem('game-id')));
  }

  updateGame(updatedGame: any, currentGame: Game) {
    if(!currentGame){
      throw new Error("updateGame: No game provided");
    }

    currentGame.name = updatedGame.name;
    currentGame.startTime = updatedGame.startTime;
    currentGame.endTime = updatedGame.endTime;
    currentGame.nwLat = updatedGame.nwLat;
    currentGame.seLat = updatedGame.seLat;
    currentGame.nwLng = updatedGame.nwLng;
    currentGame.seLng = updatedGame.seLng;

    const url = `${APIGames}/${currentGame.id}`;
    return this.http.put(url, currentGame).subscribe({
      next:(response: any) => {
        console.log("NEXT: ", response)
      },
      error:(error: HttpErrorResponse) => {
        console.log("ERROR: ", error.message);
      }
    });
  }

  public gameByID(id: number): Game | undefined {
    return this._games.find(game => game.id === id);
  }
}
