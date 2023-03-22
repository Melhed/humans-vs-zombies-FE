import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../models/player.model';
import { PlayerListService } from './player-list.service';
const {APIGames} = environment;

@Injectable({
  providedIn: 'root'
})
export class EditPlayerService {
  private _players: Player[] = [];
  private _error: string = "";
  private _loading: boolean = false;


  public get players(): Player[] {
    return this._players;
  }
  public get error(): string {
    return this._error;
  }

  public get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient,
    private readonly playerListService: PlayerListService) { }

    updateObjectProperty(playerId: number, propertyValue: any) {
      const player: Player | undefined = this.playerListService.playerById(playerId);
      if(!player){
        throw new Error("updatePlayer: No player with Id: " + playerId);
      }
      const url = `${APIGames}/3/player/${playerId}`;
      return this.http.put(url, {
        bite_code: "ppp" 
      }).subscribe({
        next:(response: any) => {
          console.log("NEXT: ", response)
        },
        error:(error: HttpErrorResponse) => {
          console.log("ERROR: ", error.message);
        }
        
      });;
    }

  public updatePlayer(playerId: number, value: any): void {
    const player: Player | undefined = this.playerListService.playerById(playerId);
    console.log("Current Player ----> ", player?.state);

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': ''
    })

    if(!player){
      throw new Error("updatePlayer: No player with Id: " + playerId);
    }

    console.log("property Value ", value);
    
    this.http.patch(`${APIGames}/${localStorage.getItem('game-id')}/player/${playerId}`,{
      bite_code: [...player.biteCode, "ppp" ]
    },
    {
      headers
    }
    ).subscribe({
      next:(response: any) => {
        console.log("NEXT: ", response)
      },
      error:(error: HttpErrorResponse) => {
        console.log("ERROR: ", error.message);
      }
      
    });
    console.log("test");
  }

  
}
