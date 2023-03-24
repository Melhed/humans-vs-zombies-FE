import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Game } from '../models/game.model';
import { Kill } from '../models/kill.model';
import { StorageUtil } from '../utils/storage.util';
import { CheckinService } from './squad-checkin.service';

const { APIKill, APIKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class KillService {
  constructor(private readonly http: HttpClient) {}

  private _kills$ = new BehaviorSubject<Kill[]>([]);
  kills = this._kills$.asObservable();

  updateKills(kills: Kill[]): void {
    this._kills$.next(kills);
  }

  private _mostRecentKill?: Kill = undefined;

  private _error: String = '';

  private _loading: boolean = false;

  get mostRecentKill(): Kill | undefined {
    return this._mostRecentKill;
  }

  get error(): String {
    return this._error;
  }
  get loading(): boolean {
    return this._loading;
  }

  public fetchKills(gameId: number): void {
    this.http.get<Kill[]>(APIKill.replace('{gameId}', gameId + '')).subscribe({
      next: (kills: Kill[]) => this.updateKills(kills),
    });
  }

  public updateKill(killUpdate: {
    id: number;
    story: string;
    lat: number;
    lng: number;
    killer: number;
    victim: number;
    game: number;
    timeOfDeath: string;
  }): void {
    this.http
      .put<Kill>(
        `${APIKill.replace('{gameId}', killUpdate.game + '')}/${killUpdate.id}`,
        killUpdate
      )
      .subscribe({
        next: () => {
          this.fetchKills(killUpdate.game);
          window.location.reload();
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }

  public addKill(killPostDTO: {
    killPosterId: number | undefined;
    killerId: number | undefined;
    biteCode: string;
    story: string;
    lat: string;
    lng: string;
  }): void {
    const game: Game = StorageUtil.storageRead(StorageKeys.Game)!;

    this.http
      .post<Kill>(`${APIKill.replace('{gameId}', game.id + '')}`, killPostDTO)
      .subscribe({
        next: (kill: Kill) => {
          this.fetchKills(game.id!);
          this._mostRecentKill = kill;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }

  public deleteKill(killId: number) {
    const game: Game = StorageUtil.storageRead(StorageKeys.Game)!;
    this.http.delete(`${APIKill.replace('{gameId}', game.id + '')}/${killId}`).subscribe({
      next: () => {
        this.fetchKills(game.id!);
        window.location.reload();
      }
    });
  }
}
