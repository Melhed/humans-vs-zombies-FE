import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../consts/storage-keys.enum';
import { SquadCheckin } from '../models/squad-checkin.model';
import { Player } from '../models/player.model';
import { StorageUtil } from '../utils/storage.util';
import { SquadListService } from './squad-list.service';
import { Game } from '../models/game.model';
import { SquadMember } from '../models/squad-member.model';
import { Squad } from '../models/squad.model';
import { SquadService } from './squad.service';

const { APIGames, APIKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class CheckinService {
  constructor(private readonly http: HttpClient, private readonly squadListService: SquadListService, private readonly squadService: SquadService) {}
  private _error: String = '';
  private _loading: boolean = false;
  private _checkins$ = new BehaviorSubject<SquadCheckin[]>([]);
  checkins = this._checkins$.asObservable();

  updateCheckins(checkins: SquadCheckin[]) {
    this._checkins$.next(checkins);
  }

  get error(): String {
    return this._error;
  }
  get loading(): boolean {
    return this._loading;
  }

  public findCheckins() {
    const player: Player | undefined = StorageUtil.storageRead(StorageKeys.Player);
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    this.squadListService.squads.subscribe((squads: Squad[]) => {
      squads.forEach((squad: Squad) => {

        if(squad.gameId === game!.id) {
          this.squadService.findSquadMembers(squad.id);
          this.squadService.squadMembers.subscribe((fetchedSquadMembers: SquadMember[]) => {
            fetchedSquadMembers.forEach((member: SquadMember) => {
              if(player!.id === member.playerId) {
                this.fetchSquadCheckins(member.squadId);
                return;
              }
            })
          });
        }

      })
    })
  }

  private fetchSquadCheckins(squadId: number): void {
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    
    this._loading = true;

    this.http.get<SquadCheckin[]>(`${APIGames}/${game!.id}/squad/${squadId}/check-in`).subscribe((squadCheckins: SquadCheckin[]) => {
      this.updateCheckins(squadCheckins)
      console.log(squadCheckins);
    })
  }
}
