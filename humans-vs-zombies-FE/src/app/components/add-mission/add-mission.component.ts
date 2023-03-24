import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Mission } from 'src/app/models/mission.model';
import { GameListService } from 'src/app/services/game-list.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Game } from 'src/app/models/game.model';

const {APIMission} = environment;

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent {
  constructor(
    private readonly http: HttpClient,
    public datepipe: DatePipe,
    private readonly gameService: GameListService
  ) { }

  showAddMissionModal = false;

  private _mission: any = {
    "title": "",
    "description": ""
  }

  public getMissions (): Mission[] {
    return this._mission;
  }

  toggleAddMissionModal() {
    this.showAddMissionModal = !this.showAddMissionModal;
  }
  
  onAddMission(mission: {title: String, description: String, startTime: Date, endTime: Date, lat: number, lng: number, humanVisible: boolean, zombieVisible: boolean, gameId: number}) {
    this._mission = mission;

    let date = this.datepipe.transform((new Date), 'dd/MM/yyy h:mm:ss')!;
    console.log(date);

    if(mission.endTime > mission.startTime || mission.startTime.toString() < date) {
      const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
      console.log("ID: " + game?.id);
      this.http.post(`${APIMission.replace('{gameId}', game?.id + '')}`, mission)
      .subscribe((response) => {
        console.log(response);
      });
    } else {
      console.log("Check the times");
      alert("End time of mission before start time, redo please :)");
    }
  }

}
