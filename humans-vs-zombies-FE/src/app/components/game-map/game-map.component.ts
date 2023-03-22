import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Map, Overlay } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Kill } from 'src/app/models/kill.model';
import { MarkerType } from 'src/app/models/marker.model';
import { GameMapService } from 'src/app/services/game-map.service';
import { GameMarkerService } from 'src/app/services/game-marker.service';
import { KillService } from 'src/app/services/kill.service';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['.//game-map.component.css'],
})
export class GameMapComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly gameMapService: GameMapService,
    private readonly gameMarkerService: GameMarkerService,
    private readonly killService: KillService
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
    this.killService.fetchKills(localStorage.getItem('game-id')!);

    this._gameMap = this.gameMapService.createGameMap(
      -408.75,
      80.78,
      -344.02,
      71.73
    );
    this._gameMap = this.gameMapService.map;

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
