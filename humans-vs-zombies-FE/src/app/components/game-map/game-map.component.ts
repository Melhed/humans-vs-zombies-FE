import { Component, OnInit } from '@angular/core';
import { Map } from 'ol';
import { fromLonLat, fromUserCoordinate, Projection } from 'ol/proj';
import { Kill } from 'src/app/models/kill.model';
import { GameMapService } from 'src/app/services/game-map.service';
import { KillService } from 'src/app/services/kill.service';

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
    private readonly killService: KillService
  ) {}

  ngOnInit(): void {
    // this.kills = this.killService.fetchKills(1).subscribe((kills) => {
    //   if (kills !== null) return kills;
    // });
    this.gameMap = this.gameMapService.createGameMap(
      -408.75,
      80.78,
      -344.02,
      71.73
    );
    this.gameMap = this.gameMapService.map;
  }
}
