import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mission } from '../models/mission.model';

const { APIMission, APIKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor(private readonly http: HttpClient) {}
  
  private _missions: Mission[] = [];
  private _error: String = '';

  private _loading: boolean = false;

  get missions(): Mission[] {
    return this._missions;
  }

  get error(): String {
    return this._error;
  }
  get loading(): boolean {
    return this._loading;
  }

  public fetchMissions(gameId: number): Observable<Mission[] | void> {
    console.log(`${APIMission.replace('{gameId}', gameId + '')}`);
    return this.http.get<Mission[]>(`${APIMission.replace('{gameId}', (gameId) + '')}`)
    .pipe(catchError(async (err) => console.log(err)));
  }

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
          this._missions = missions;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }
}
