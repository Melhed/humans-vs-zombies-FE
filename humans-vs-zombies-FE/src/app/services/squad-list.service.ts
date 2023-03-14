import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const {APIGames} = environment;
@Injectable({
  providedIn: 'root'
})
export class SquadListService {
  
  constructor(private readonly http: HttpClient) { }

  public findAllSquads(): void {
      this.http.get(APIGames+"/3/squad")
        .subscribe({
          next: () => {
            
          },
          error: () => {

          }
        })
  }
}
