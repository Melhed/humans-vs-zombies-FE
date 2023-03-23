import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Map, Overlay } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat, fromUserCoordinate, Projection } from 'ol/proj';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Game } from 'src/app/models/game.model';
import { Kill } from 'src/app/models/kill.model';
import { MarkerType } from 'src/app/models/marker.model';
import { Marker } from 'src/app/models/marker.model';
import { Mission } from 'src/app/models/mission.model';
import { GameMapService } from 'src/app/services/game-map.service';
import { GameService } from 'src/app/services/game.service';
import { KillService } from 'src/app/services/kill.service';
import { GameMarkerService } from 'src/app/services/game-marker.service';
import { MissionService } from 'src/app/services/mission.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['.//game-map.component.css'],
})
export class GameMapComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly gameMapService: GameMapService,
    private readonly gameService: GameService,
    private readonly killService: KillService,
    private readonly missionService: MissionService,
    private readonly gameMarkerService: GameMarkerService
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
    this._gameMap = this.gameMapService.createGameMap(
      game!.nwLat,
      game!.nwLng,
      game!.seLat,
      game!.seLng
    );
    this.missionService.fetchMissions(game?.id);
    this.killService.fetchKills(game!.id!);

    this.killService.kills.subscribe((kills: Kill[]) => {
      if (kills[0]) {
        const killLayer: VectorLayer<VectorSource> =
          this.gameMarkerService.createKillMarkerLayer(kills);

        this._gameMap!.addLayer(killLayer);
      }
    });
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
            console.log('called');
          });
        }

        this.showModal = true;
      }
    });
  }

  receiveDisableModal($event: boolean) {
    this._showModal = $event;
  }

  setKillerMarkerData(kill: Kill): void {
    this._currentMarkerType = MarkerType.KILL;
    this._currentMarkerData = kill;
  }
}
