import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Game } from 'src/app/models/game.model';
import { PlayerSquadInfo } from 'src/app/models/player-squad-info.model';
import { SquadCheckin } from 'src/app/models/squad-checkin.model';
import { CheckinService } from 'src/app/services/squad-checkin.service';
import { SquadListService } from 'src/app/services/squad-list.service';
import { SquadService } from 'src/app/services/squad.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { environment } from 'src/environments/environment';
const { APIGames } = environment;

@Component({
  selector: 'app-create-squad-checkin-modal',
  templateUrl: './create-squad-checkin-modal.component.html'
})

export class CreateSquadCheckinModalComponent implements OnInit{
  constructor(private readonly squadCheckinService: CheckinService, private readonly http: HttpClient, private readonly squadListService: SquadListService, private readonly squadService: SquadService){}
  @Output() disableModalEvent = new EventEmitter<boolean>();
  private _playerSquadInfo: PlayerSquadInfo | undefined = undefined;

  sendDisableModalEvent() {
    this.disableModalEvent.emit(false);
  }

  ngOnInit(): void {
    this.squadService.findPlayersSquad();
    this.squadService.playerSquadInfo.subscribe((playerSquadInfo: PlayerSquadInfo | undefined) => {
      if(playerSquadInfo !== undefined) {
        this._playerSquadInfo = playerSquadInfo;
      }
    })
  }

  addCheckin(checkin: {
    lat: number;
    lng: number;
  }):void {
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    const squadId = this._playerSquadInfo!.playerSquadId;
    const newCheckin = {
      lat: checkin.lat, lng: checkin.lng,
      gameId: game!.id, squadId: this._playerSquadInfo!.playerSquadId, squadMemberId: this._playerSquadInfo!.playerMemberId
    }

    this.http.post<SquadCheckin>(`${APIGames}/${game?.id}/squad/${squadId}/check-in`, newCheckin).subscribe({
      next: () => {
        this.squadCheckinService.findCheckins();
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })

  }
}
