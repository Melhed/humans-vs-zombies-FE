import { Component, OnInit } from '@angular/core';
import { Map } from 'ol';
import { fromLonLat, fromUserCoordinate, Projection } from 'ol/proj';
import { GameMapService } from 'src/app/services/game-map.service';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['.//game-map.component.css'],
})
export class GameMapComponent implements OnInit {
  private gameMap?: Map;

  constructor(private readonly gameMapService: GameMapService) {}

  ngOnInit(): void {
    this.gameMap = this.gameMapService.createGameMap(
      -408.75,
      80.78,
      -344.02,
      71.73
    );
    this.gameMap = this.gameMapService.map;
  }
}
