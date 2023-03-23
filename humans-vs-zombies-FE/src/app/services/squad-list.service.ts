import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
import { Squad } from '../models/squad.model';
import { StorageUtil } from '../utils/storage.util';
import { GameService } from './game.service';
import { PlayerService } from './player.service';


const {APIGames} = environment;
@Injectable({
  providedIn: 'root'
})
export class SquadListService {
  constructor(
    private readonly http: HttpClient,
    private readonly gameService: GameService,
    private readonly playerService: PlayerService
  ) { }

  private _squads$ = new BehaviorSubject<Squad[]>([]);
  squads = this._squads$.asObservable();
  private _error: String = "";
  private _loading: boolean = false;

  get error(): String {
    return this._error;
  }
  get loading(): boolean {
    return this._loading;
  }

  private updateSquads(squads: Squad[]) {
    this._squads$.next(squads);
  }

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
        next: (squads: Squad[]) => {
          this.updateSquads(squads);
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  joinSquad(squad: Squad, player: Player | undefined): void {
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    this.http.post<Squad>(`${APIGames}/${game?.id}/squad/${squad.id}/join`, player!.id)
      .subscribe({
        next: () => {
          StorageUtil.storageSave(StorageKeys.Squad, squad);
          StorageUtil.storageRemove(StorageKeys.Player);
          console.log(StorageUtil.storageRead(StorageKeys.Player));
          this.playerService.setPlayer(game?.id, player!.user);
          this.findAllSquads();
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  createNewSquad(name: string, player: Player  | undefined) {
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    const squadDTO = {
      playerId: player!.id,
      squadName: name
    }

    this.http.post<Squad>(`${APIGames}/${game?.id}/squad/`, squadDTO)
    .subscribe({
      next: (squad: Squad) => {
        StorageUtil.storageSave(StorageKeys.Squad, squad);
        StorageUtil.storageRemove(StorageKeys.Player);
        this.playerService.setPlayer(game?.id, player!.user);
        this.findAllSquads();
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }
}
