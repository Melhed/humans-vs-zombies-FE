import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Game } from 'src/app/models/game.model';
import { Kill } from 'src/app/models/kill.model';
import { MarkerType } from 'src/app/models/marker.model';
import { GameMapService } from 'src/app/services/game-map.service';
import { KillService } from 'src/app/services/kill.service';
import { GameMarkerService } from 'src/app/services/game-marker.service';
import { MissionService } from 'src/app/services/mission.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import VectorSource from 'ol/source/Vector';
import { Player, PlayerState } from 'src/app/models/player.model';
import { CheckinService } from 'src/app/services/squad-checkin.service';
import { SquadCheckin } from 'src/app/models/squad-checkin.model';
import { Mission } from 'src/app/models/mission.model';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['.//game-map.component.css'],
})
export class GameMapComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly gameMapService: GameMapService,
    private readonly killService: KillService,
    private readonly missionService: MissionService,
    private readonly gameMarkerService: GameMarkerService,
    private readonly squadCheckinService: CheckinService
  ) {}

  @ViewChild('popupcontainer') popupContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('popupinfo') popupInfo!: ElementRef<HTMLDivElement>;
  private _gameMap?: Map;
  private _showModal: boolean = false;
  private _currentMarkerData?: any = undefined;
  private _currentMarkerType?: MarkerType = undefined;

  public get currentMarkerData(): any {
    return this._currentMarkerData;
  }

  public get currentMarkerType(): any {
    return this._currentMarkerType;
  }

  public set currentMarkerData(currentData: any) {
    this._currentMarkerData = currentData;
  }

  public set showModal(showModal: boolean) {
    this._showModal = showModal;
  }

  public get showModal(): boolean {
    return this._showModal;
  }

  ngOnInit(): void {
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    const player: Player | undefined = StorageUtil.storageRead(
      StorageKeys.Player
    );

    this._gameMap = this.gameMapService.createGameMap(
      game!.nwLat,
      game!.nwLng,
      game!.seLat,
      game!.seLng
    );
    this.missionService.fetchMissions();
    this.killService.fetchKills(game!.id!);
    if (player?.state === PlayerState.SQUAD_MEMBER) {
      this.squadCheckinService.findCheckins();
    }

    this.missionService.missions.subscribe((missions: Mission[]) => {
      if (missions[0]) {
        const missionLayer: VectorLayer<VectorSource> =
          this.gameMarkerService.createMissionMarkerLayer(missions);
        this._gameMap!.addLayer(missionLayer);
      }
    });

    this.killService.kills.subscribe((kills: Kill[]) => {
      if (kills[0]) {
        const killLayer: VectorLayer<VectorSource> =
          this.gameMarkerService.createKillMarkerLayer(kills);

        this._gameMap!.addLayer(killLayer);
      }
    });

    if (player?.state === PlayerState.SQUAD_MEMBER) {
      this.squadCheckinService.checkins.subscribe(
        (checkins: SquadCheckin[]) => {
          if (checkins[0]) {
            const checkinLayer: VectorLayer<VectorSource> =
              this.gameMarkerService.createSquadCheckinMarkerLayer(checkins);
            this._gameMap!.addLayer(checkinLayer);
          }
        }
      );
    }
  }

  ngAfterViewInit(): void {
    this._gameMap!.on('click', (e) => {
      const feature = this._gameMap!.forEachFeatureAtPixel(
        e.pixel,
        function (feature) {
          return feature;
        }
      );
      if (feature) {
        if (
          this.currentMarkerData === undefined ||
          this.currentMarkerType !== feature.getProperties()['type'] ||
          this.currentMarkerData.id !== feature.getProperties()['id']
        ) {
          this.gameMarkerService.fetchMarkerData(feature.getProperties());
          this.gameMarkerService.clickedMarkerData.subscribe((data) => {
            if (data.killer) this.setKillerMarkerData(data);
            if (data.missionID) this.setMissionMarkerData(data);
            if (data.squadMemberId) this.setCheckinMarkerData(data);
          });
        }
        this.showModal = true;
      }
    });
  }

  receiveDisableModal($event: boolean) {
    this._showModal = $event;
  }

  setCheckinMarkerData(checkin: SquadCheckin): void {
    this._currentMarkerType = MarkerType.SQUADCHECKIN;
    this._currentMarkerData = checkin;
  }

  setMissionMarkerData(mission: Mission): void {
    this._currentMarkerType = MarkerType.MISSION;
    this._currentMarkerData = mission;
  }

  setKillerMarkerData(kill: Kill): void {
    this._currentMarkerType = MarkerType.KILL;
    this._currentMarkerData = kill;
  }
}
