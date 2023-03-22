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
  private _player: any[] = [];


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


  

  updatePlayerState(playerId: number, propertyValue: any): Observable<Player> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${APIGames}/${localStorage.getItem('id')}/player/${playerId}`;
    const updatedFields = { ["state"]: propertyValue };
    console.log("UPDATE")
    return this.http.put<Player>(url, updatedFields, { headers });
  }

  public updatePlayer(playerId: number, value: any): void {
    // console.log("updatePlayer Id:", playerId);
    // console.log("this.playerListService.findPlayerById(playerId): ", this.playerListService.findPlayerById(playerId).subscribe({
    //   next:(response: any) => {
    //     console.log("NEXT: ", response)
    //   },
    //   error:(error: HttpErrorResponse) => {
    //     console.log("ERROR: ", error.message);
    //   }
      
    // }));
    let res: any[] = [];
    this.playerListService.findPlayerById(playerId).subscribe({
      next:(response: any) => {
        this._player = response;
        res = response;
        console.log("NEXT: ", response)
        response.state = value;
        console.log("NEXT: ", response)
      },
      error:(error: HttpErrorResponse) => {
        console.log("ERROR: ", error.message);
      }
      
    });
    console.log("player ", this._player);

    const headers = new HttpHeaders({
      'content-type': 'application/json'
    })

    // if(!this._player){
    //   throw new Error("updatePlayer: No player with Id: " + playerId);
    // }

    console.log("res", res.values.name);
    
    this.http.patch(`${APIGames}/${localStorage.getItem('game-id')}/player/${playerId}`,{
      state: "test"
    },
    {
      headers
    }
    )
    console.log("test");
  }

  
}
