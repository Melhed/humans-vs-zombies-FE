import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mission } from '../models/mission.model';

const { APIMission, APIKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class KillService {
  private _missions$ = new BehaviorSubject<Mission[]>([]);
  missions = this._missions$.asObservable();

  updateMissions(missions: Mission[]) {
    this._missions$.next(missions);
  }

  private _error: String = '';

  private _loading: boolean = false;

  get error(): String {
    return this._error;
  }
  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {}

  public findGameMissions(): void {
    this._loading = true;
    this.http
      .get<Mission[]>(
        APIMission.replace('{gameId}', localStorage.getItem('id') + '')
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
}
