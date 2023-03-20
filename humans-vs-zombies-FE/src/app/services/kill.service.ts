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

  public findGameKills(): void {
    this._loading = true;
    this.http
      .get<Kill[]>(
        APIKill.replace('{gameId}', localStorage.getItem('game-id') + '')
      )
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (kill: Kill[]) => {
          this._kill = kill;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }
}
