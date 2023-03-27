import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../consts/storage-keys.enum';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import keycloak from 'src/keycloak';

const { APIGames } = environment;

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private readonly http: HttpClient) {}
  private _player$ = new BehaviorSubject<Player | undefined>(undefined);
  player = this._player$.asObservable();

  createPlayerAdmin(gameId: number | undefined, user: User) {
    const playerAdminDTO = {
      id: null,
      state: 'ADMINISTRATOR',
      isHuman: true,
      isPatientZero: false,
      biteCode: null,
      user: user.id,
      game: gameId,
    };

    this.http
      .post<Player>(`${APIGames}/${gameId}/player`, playerAdminDTO)
      .subscribe({
        next: (player: Player) => {
          StorageUtil.storageSave<Player>(StorageKeys.Player, player);
          this.updatePlayer(player);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
  }

  private updatePlayer(player: Player) {
    StorageUtil.storageSave<Player>(StorageKeys.Player, player!);
    this._player$.next(player);
  }

  public createPlayer(gameId: number | undefined, user: User): void {
    this.http.post<Player>(`${APIGames}/${gameId}/player/u`, user).subscribe({
      next: (player: Player) => {
        this.updatePlayer(player);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  public handlePlayerAccess(gameId: number, user: User) {
    this.checkPlayer(gameId, user.id).subscribe(
      (fetchedPlayer: Player | void) => {
        if (!(fetchedPlayer instanceof Object)) {
          console.log('... creating new player');
          if (keycloak.hasRealmRole('hvz-admin')) {
            return this.createPlayerAdmin(gameId, user);
          }
          return this.createPlayer(gameId, user);
        }
      }
    );
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
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
  }

  public setDummyPlayer(userId: string) {
    const dummyPlayer: Player = {
      user: userId,
    };
    this.updatePlayer(dummyPlayer);
    StorageUtil.storageSave<Player>(StorageKeys.Player, dummyPlayer);
  }
}
