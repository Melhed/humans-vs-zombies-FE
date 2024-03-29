import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Game } from '../models/game.model';
import { Mission } from '../models/mission.model';
import { StorageUtil } from '../utils/storage.util';

const { APIMission } = environment;

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor(private readonly http: HttpClient) {}
  private _error: String = '';
  private _loading: boolean = false;
  private _missions$ = new BehaviorSubject<Mission[]>([]);
  missions = this._missions$.asObservable();

  updateMissions(missions: Mission[]) {
    this._missions$.next(missions);
  }

  get error(): String {
    return this._error;
  }
  get loading(): boolean {
    return this._loading;
  }

  public updateMission(mission: Mission): void {
    this.http.put<Mission>(`${APIMission.replace("{gameId}", mission.gameId + "")}/${mission.missionID}`, mission).subscribe({
      next: () => {
        this.fetchMissions();
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      },
    })
  }

  public fetchMissions(): void {
    const currentGame: Game = StorageUtil.storageRead(StorageKeys.Game)!;
    this._loading = true;
    this.http
      .get<Mission[]>(
        APIMission.replace('{gameId}', currentGame.id + '')
      )
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (missions: Mission[]) => {
          this.updateMissions(missions);
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }

  public deleteMission(missionId: number) {
    const game: Game = StorageUtil.storageRead(StorageKeys.Game)!;
    this.http.delete(`${APIMission.replace('{gameId}', game.id + '')}/${missionId}`).subscribe({
      next: () => {
        this.fetchMissions();
        window.location.reload();
      }
    });
  }
}
