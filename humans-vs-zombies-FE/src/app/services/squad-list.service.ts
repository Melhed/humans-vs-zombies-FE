import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Squad } from '../models/squad.model';


const {APIGames} = environment;
@Injectable({
  providedIn: 'root'
})
export class SquadListService {
  private _squad: Squad[] = [];
  private _error: String = "";

  private _loading: boolean = false; 

  get squads(): Squad[] {
    return this._squad;
  }

  get error(): String {
    return this._error;
  }
  get loading(): boolean {
    return this._loading;
  }

  
  
  constructor(private readonly http: HttpClient) { }

  public findAllSquads(): void {
    this._loading =  true;
      this.http.get<Squad[]>(APIGames+"/3/squad")
      .pipe(
        finalize(() => {
          this._loading = false;
        }
        )
      )
      .subscribe({
        next: (squad: Squad[]) => {
          this._squad = squad;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }
}
