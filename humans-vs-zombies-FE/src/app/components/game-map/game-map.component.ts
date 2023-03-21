import { Component, OnInit } from '@angular/core';
import { Map } from 'ol';
import { fromLonLat, fromUserCoordinate, Projection } from 'ol/proj';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Game } from 'src/app/models/game.model';
import { Kill } from 'src/app/models/kill.model';
import { GameMapService } from 'src/app/services/game-map.service';
import { GameService } from 'src/app/services/game.service';
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
    private readonly gameService: GameService,
    private readonly killService: KillService,
  ) {}

  ngOnInit(): void {
    // this.kills = this.killService.fetchKills(1).subscribe((kills) => {
    //   if (kills !== null) return kills;
    // });
    const game: Game | undefined = StorageUtil.storageRead(StorageKeys.Game);
    this.gameMap = this.gameMapService.createGameMap(
      game!.nwLat,
      game!.nwLng,
      game!.seLat,
      game!.seLng
    );
    this.gameMap = this.gameMapService.map;
  }
}
