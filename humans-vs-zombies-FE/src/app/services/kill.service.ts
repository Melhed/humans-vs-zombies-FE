import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kill } from '../models/kill.model';

const { APIKill, APIKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class KillService {
  private _kill: Kill[] = [];
  private _error: String = '';

  private _loading: boolean = false;

  get kills(): Kill[] {
    return this._kill;
  }

  get error(): String {
    return this._error;
  }
  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) {}


  private _mostRecentKill?: Kill = undefined;

  private _error: String = "";

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

  public fetchKills(gameId: number): Observable<Kill[] | void> {
    return this.http
      .get<Kill[]>(`${APIKill.replace('{gameId}', gameId + '')}`)
      .pipe(catchError(async (err) => console.log(err)));

  }

  public addKill(killPostDTO : {killPosterId: number, killerId: number, biteCode: string, story: string, lat: string, lng: string}): void {
    const gameId = localStorage.getItem('game-id');

    this.http
      .post<Kill>(`${APIKill.replace('{gameId}', gameId + '')}`, killPostDTO)
      .subscribe({
        next: (kill: Kill) => {
          this._mostRecentKill = kill;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }
}
