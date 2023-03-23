import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Game } from 'src/app/models/game.model';
import { Mission } from 'src/app/models/mission.model';
import { MissionService } from 'src/app/services/mission.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { environment } from 'src/environments/environment';
const { APIMission } = environment;

@Component({
  selector: 'app-create-mission-modal',
  templateUrl: './create-mission-modal.component.html',
})
export class CreateMissionModalComponent {
  constructor(private readonly missionService: MissionService, private readonly http: HttpClient){}
  @Output() disableModalEvent = new EventEmitter<boolean>();

  sendDisableModalEvent() {
    this.disableModalEvent.emit(false);
  }

  addMission(missionInfo: {
    name: string,
    description?: string,
    //TODO: Cant get these two to register
    startTime?: String,
    endTime?: String,
    lat: number,
    lng: number,
    isHumanVisible: boolean,
    isZombieVisible: boolean,
    gameId?: number,
  }):void {
    const currentGame: Game = StorageUtil.storageRead(StorageKeys.Game)!;
    missionInfo.gameId = currentGame.id!;
    
    this.http.post<Mission>(`${APIMission.replace("{gameId}", currentGame.id + "")}`, missionInfo).subscribe({
      next: (mission: Mission) => {
        this.missionService.fetchMissions();
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })

  }

}
