import { Component, OnInit } from '@angular/core';
import { Map } from 'ol';
import Layer from 'ol/layer/Layer';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat, fromUserCoordinate, Projection } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Kill } from 'src/app/models/kill.model';
import { Marker } from 'src/app/models/marker.model';
import { GameMapService } from 'src/app/services/game-map.service';
import { GameMarkerService } from 'src/app/services/game-marker.service';
import { KillService } from 'src/app/services/kill.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['.//game-map.component.css'],
})
export class GameMapComponent implements OnInit {
  private gameMap?: Map;
  private kills?: Kill[] | undefined;

  constructor(
    private readonly gameMapService: GameMapService,
    private readonly gameMarkerService: GameMarkerService,
    private readonly killService: KillService
  ) {}

  ngOnInit(): void {
    const gameId = localStorage.getItem('game-id')!;
    this.killService.fetchKills(parseInt(gameId));
    this.kills = this.killService.kills;

    this.gameMap = this.gameMapService.createGameMap(
      -408.75,
      80.78,
      -344.02,
      71.73
    );

    let killLayer = this.gameMarkerService.createKillMarkerLayer(this.kills);

    this.gameMap = this.gameMapService.map;
    this.gameMap!.addLayer(killLayer);
  }
}
