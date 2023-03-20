import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Player } from '../models/player.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

const { APIGames } = environment;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private readonly http: HttpClient) {}

  public joinGame(gameId: string): void {
    const user = StorageUtil.storageRead<User>(StorageKeys.User);
    this.checkPlayer(gameId, user!.id).subscribe(
      (fetchedPlayer: undefined | Player) => {
        if (fetchedPlayer === undefined) {
          this.createPlayer(gameId, user!);
        }
        StorageUtil.storageSave<Player>(StorageKeys.Player, fetchedPlayer!);
      }
    );
  }

  public createPlayer(gameId: string, user: User): void {
    this.http.post<Player>(`${APIGames}/${gameId}/player/u`, user).subscribe({
      next: (player: Player) => {
        StorageUtil.storageSave<Player>(StorageKeys.Player, player);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  public checkPlayer(gameId: string, userId: string): Observable<any> {
    return this.http
      .get<Player>(`${APIGames}/${gameId}/player/user/${userId}`)
      .pipe(catchError(async (err) => console.log(err)));
  }
}
