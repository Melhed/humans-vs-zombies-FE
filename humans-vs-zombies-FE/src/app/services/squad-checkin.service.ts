import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Checkin } from '../models/squad-checkin.model';
import { Player } from '../models/player.model';
import { StorageUtil } from '../utils/storage.util';

const { APIGames, APIKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class CheckinService {
  private _checkins: Checkin[] = [];
  private _error: String = '';

  private _loading: boolean = false;

  get checkins(): Checkin[] {
    return this._checkins;
  }

  get error(): String {
    return this._error;
  }
  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {}

  public findSquadCheckins(): void {
    const currentPlayer: Player | undefined = StorageUtil.storageRead(
      StorageKeys.Player
    );
    this._loading = true;

    // TODO: Find squad through playerId and squad member service, fetch checkins

    // this.http
    //   .get<Checkin[]>(
    //     `${APIGames}/${localStorage.getItem('id')}/squad/${squadId}/check-in`
    //   )
    //   .pipe(
    //     finalize(() => {
    //       this._loading = false;
    //     })
    //   )
    //   .subscribe({
    //     next: (checkins: Checkin[]) => {
    //       this._checkins = checkins;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       this._error = error.message;
    //     },
    //   });
  }
}
