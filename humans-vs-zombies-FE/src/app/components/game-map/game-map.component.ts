import { Component, OnInit } from '@angular/core';
import { Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import { LineString, Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { fromLonLat, fromUserCoordinate, Projection } from 'ol/proj';
import Layer from 'ol/layer/Layer';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { GameMapService } from 'src/app/services/game-map.service';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['.//game-map.component.css']
})
export class GameMapComponent implements OnInit {

  private gameMap?: Map;

  constructor(private readonly gameMapService: GameMapService) {}

  ngOnInit(): void {
    this.gameMap = this.gameMapService.createGameMap(-408.75, 80.78, -344.02, 71.73);
    this.gameMapService.addMarker(fromLonLat([-344.02, 71.73]), false);
    this.gameMap = this.gameMapService.map;
  }

}
