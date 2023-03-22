import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Game } from '../models/game.model';
import { playerState } from '../models/player.model';
import { Squad } from '../models/squad.model';
import { StorageUtil } from '../utils/storage.util';
import { GameService } from './game.service';


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


  constructor(private readonly http: HttpClient, private readonly gameService: GameService) { }

  public findAllSquads(): void {
    this._loading =  true;
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    this.http.get<Squad[]>(`${APIGames}/${game?.id}/squad`)
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

  joinSquad(squad: Squad, player: any): void {
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    this.http.post<Squad>(`${APIGames}/${game?.id}/squad/${squad.id}/join`, player.id)
      .subscribe({
        next: () => {
          StorageUtil.storageRemove(StorageKeys.Player);
          StorageUtil.storageSave(StorageKeys.Player, {
            id: player.id,
            state: "SQUAD_MEMBER",
            biteCode: player.biteCode,
            user: player.user,
            game: player.game,
            human: player.human
          });
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  createNewSquad(name: string, player: any) {
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    const squadDTO = {
      playerId: player.id,
      squadName: name
    }
    console.log(squadDTO);

    this.http.post<Squad>(`${APIGames}/${game?.id}/squad/`, squadDTO)
    .subscribe({
      next: () => {
        StorageUtil.storageRemove(StorageKeys.Player);
        StorageUtil.storageSave(StorageKeys.Player, {
          id: player.id,
          state: "SQUAD_MEMBER",
          biteCode: player.biteCode,
          user: player.user,
          game: player.game,
          human: player.human
        });
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }
}
