import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Checkin } from '../models/checkin.model';

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
    const squadId: number = 3;
    this._loading = true;

    this.http
      .get<Checkin[]>(
        `${APIGames}/${localStorage.getItem('id')}/squad/${squadId}/check-in`
      )
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (checkins: Checkin[]) => {
          this._checkins = checkins;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }
}
