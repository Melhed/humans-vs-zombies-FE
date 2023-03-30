import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable } from 'rxjs';
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
  private _isLoading: boolean = false;

  public get isLoading(): boolean {
    return this._isLoading;
  }

  private _player$ = new BehaviorSubject<Player | undefined>(undefined);
  player = this._player$.asObservable();

  createPlayerAdmin(gameId: number | undefined, user: User) {
    this._isLoading = true;

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
      .pipe(finalize(() => (this._isLoading = false)))
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
    this._isLoading = true;

    this.http
      .post<Player>(`${APIGames}/${gameId}/player/u`, user)
      .pipe(finalize(() => (this._isLoading = false)))
      .subscribe({
        next: (player: Player) => {
          this.updatePlayer(player);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
  }

  public handlePlayerAccess(gameId: number, user: User) {
    this._isLoading = true;
    this.checkPlayer(gameId, user.id)
      .pipe(finalize(() => (this._isLoading = false)))
      .subscribe((fetchedPlayer: Player | void) => {
        if (!(fetchedPlayer instanceof Object)) {
          if (keycloak.hasRealmRole('hvz-admin')) {
            return this.createPlayerAdmin(gameId, user);
          }
          return this.createPlayer(gameId, user);
        }
        this.updatePlayer(fetchedPlayer);
      });
  }

  public checkPlayer(
    gameId: number | undefined,
    userId: string
  ): Observable<Player | void> {
    this._isLoading = true;
    return this.http
      .get<Player>(`${APIGames}/${gameId}/player/user/${userId}`)
      .pipe(
        finalize(() => (this._isLoading = false)),
        catchError(async (err) => console.log(err))
      );
  }

  public setPlayer(gameId: number | undefined, userId: string): void {
    this._isLoading = true;
    this.http
      .get<Player>(`${APIGames}/${gameId}/player/user/${userId}`)
      .pipe(finalize(() => (this._isLoading = false)))
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
