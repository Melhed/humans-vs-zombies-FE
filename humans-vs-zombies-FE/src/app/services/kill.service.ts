import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kill } from '../models/kill.model';

const { APIKill, APIKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class KillService {
  constructor(private readonly http: HttpClient) {}

  public fetchKills(gameId: number): Observable<Kill[] | void> {
    return this.http
      .get<Kill[]>(`${APIKill.replace('{gameId}', gameId + '')}`)
      .pipe(catchError(async (err) => console.log(err)));
  }
}
