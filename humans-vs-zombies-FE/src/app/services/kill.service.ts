import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kill } from '../models/kill.model';

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

  public fetchKills(gameId: string): void {
    this.http.get<Kill[]>(APIKill.replace('{gameId}', gameId)).subscribe({
      next: (kills: Kill[]) => this.updateKills(kills),
    });
  }

  public addKill(killPostDTO: {
    killPosterId: number;
    killerId: number;
    biteCode: string;
    story: string;
    lat: string;
    lng: string;
  }): void {
    const gameId = localStorage.getItem('game-id');

    this.http
      .post<Kill>(`${APIKill.replace('{gameId}', gameId + '')}`, killPostDTO)
      .subscribe({
        next: () => this.fetchKills(gameId!),
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }
}
