import { Component, OnInit, Injectable } from '@angular/core';
import { SquadListService } from 'src/app/services/squad-list.service';
import { GameListService } from 'src/app/services/game-list.service';
import { KillService } from 'src/app/services/kill.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Player } from 'src/app/models/player.model';
import keycloak from 'src/keycloak';

@Injectable()
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.page.html',
  styleUrls: [],
})
export class GameViewPage implements OnInit {
  constructor(
    private readonly squadListService: SquadListService,
    private readonly gameListService: GameListService,
    private readonly killService: KillService
  ) {}

  role = "";

  gameId: any = this.gameListService.gameId;
  gameToShow: any = [];
  private _player?: Player = undefined;

  public get player() {
    return this._player;
  }

  showCreateMissionModal = false;
  public toggleCreateMissionModal() {
    this.showCreateMissionModal = !this.showCreateMissionModal;
  }

  showSquadCheckinModal = false;
  public toggleSquadCheckinModal() {
    this.showSquadCheckinModal = !this.showSquadCheckinModal;
  }

  showBiteCodeModal = false;
  public toggleBiteCodeModal() {
    this.showBiteCodeModal = !this.showBiteCodeModal;
  }

  public addKill(kill: {
    biteCode: string;
    story: string;
    lat: string;
    long: string;
  }) {

    const killInfo = {
      killPosterId: this._player!.id,
      killerId: this._player!.id,
      biteCode: kill.biteCode,
      story: kill.story,
      lat: kill.lat,
      lng: kill.long,
    };
    this.killService.addKill(killInfo);
    this.toggleBiteCodeModal();
    if (this.killService.mostRecentKill !== undefined) {
      /** TODO: create marker */
      alert('Bite has been registered');
    } else {
      alert(this.killService.error);
    }
  }

  get loading(): boolean {
    return this.squadListService.loading;
  }
  get error(): String {
    return this.squadListService.error;
  }

  ngOnInit(): void {
    this._player = StorageUtil.storageRead(StorageKeys.Player);
    this.squadListService.findAllSquads();
    this.gameToShow = StorageUtil.storageRead(StorageKeys.Game);
    if(keycloak.realmAccess?.roles.includes("hvz-admin"))
    this.role = "hvz-admin";
  }
}
