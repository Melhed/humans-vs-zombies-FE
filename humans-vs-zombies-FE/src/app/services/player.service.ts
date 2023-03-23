import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../consts/storage-keys.enum';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const { APIGames } = environment;

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private readonly http: HttpClient) {}

  private _player$ = new BehaviorSubject<Player | undefined>(undefined);
  player = this._player$.asObservable();

  private updatePlayer(player: Player) {
    this._player$.next(player);
  }

  public createPlayer(gameId: number | undefined, user: User): void {
    this.http.post<Player>(`${APIGames}/${gameId}/player`, user).subscribe({
      next: (player: Player) => {
        console.log(player);

        StorageUtil.storageSave<Player>(StorageKeys.Player, player);
        this.updatePlayer(player);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  public checkPlayer(
    gameId: number | undefined,
    userId: string
  ): Observable<Player | void> {
    return this.http
      .get<Player>(`${APIGames}/${gameId}/player/user/${userId}`)
      .pipe(catchError(async (err) => console.log(err)));
  }

  public setPlayer(gameId: number | undefined, userId: string): void {
    this.http
      .get<Player>(`${APIGames}/${gameId}/player/user/${userId}`)
      .subscribe({
        next: (player: Player) => {
          this.updatePlayer(player);
          StorageUtil.storageSave<Player>(StorageKeys.Player, player!);
          console.log(StorageUtil.storageRead<Player>(StorageKeys.Player));
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
  }
}
