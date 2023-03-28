import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Game } from '../models/game.model';
import { Squad } from '../models/squad.model';
import { StorageUtil } from '../utils/storage.util';
import { environment } from 'src/environments/environment';
import { SquadDetails } from '../models/squad-details.model';
import { Player } from '../models/player.model';
import { SquadMember } from '../models/squad-member.model';
import { BehaviorSubject, finalize } from 'rxjs';
import { SquadListService } from './squad-list.service';
import { PlayerSquadInfo } from '../models/player-squad-info.model';
import { CheckinService } from './squad-checkin.service';
import { SquadCheckin } from '../models/squad-checkin.model';
const { APIGames } = environment;

@Injectable({
  providedIn: 'root'
})
export class SquadService {

  constructor(private readonly http: HttpClient, private readonly squadListService: SquadListService) {}
  private _error: String = '';
  private _loading: boolean = false;

  private _playerSquadInfo$ = new BehaviorSubject<PlayerSquadInfo | undefined>(undefined);
  playerSquadInfo = this._playerSquadInfo$.asObservable();

  updatePlayerSquadInfo(playerSquadInfo: PlayerSquadInfo) {
    this._playerSquadInfo$.next(playerSquadInfo);
  }

  private _currentPlayerSquad$ = new BehaviorSubject<Squad | undefined>(undefined);
  currentPlayerSquad = this._currentPlayerSquad$.asObservable();

  updateCurrentPlayerSquad(squad: Squad) {
    this._currentPlayerSquad$.next(squad);
  }

  private _squadmembers$ = new BehaviorSubject<SquadMember[]>([]);
  squadMembers = this._squadmembers$.asObservable();

  updateSquadMembers(checkins: SquadMember[]) {
    this._squadmembers$.next(checkins);
  }

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

  public findPlayersSquad() {
    const player: Player | undefined = StorageUtil.storageRead(StorageKeys.Player);
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    this.squadListService.squads.subscribe((squads: Squad[]) => {
      squads.forEach((squad: Squad) => {

        if(squad.gameId === game!.id) {
          this.findSquadMembers(squad.id);
          this.squadMembers.subscribe((fetchedSquadMembers: SquadMember[]) => {
            fetchedSquadMembers.forEach((member: SquadMember) => {
              if(player!.id === member.playerId) {
                this.updatePlayerSquadInfo({playerMemberId: member.id, playerSquadId: member.squadId});
                this.updateCurrentPlayerSquad(squad);
                StorageUtil.storageSave(StorageKeys.Squad, squad);
              }
            })
          });
        }

      })
    })
  }

  public findSquadMembers(squadId: number): void {
    this._loading = true;
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    this.http.get<SquadDetails>(`${APIGames}/${game?.id}/squad/${squadId}`).subscribe((squadDetails: SquadDetails) => {
      this.updateSquadMembers(squadDetails.squadMembers);
      this._loading = false;
    })
  }

}
