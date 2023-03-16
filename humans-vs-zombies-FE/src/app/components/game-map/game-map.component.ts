import { Component, OnInit } from '@angular/core';
import { Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import { Point } from 'ol/geom';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['.//game-map.component.css']
})
export class GameMapComponent implements OnInit {

  private map?: Map = undefined;

  ngOnInit(): void {
    const place = [-110, 45];

    const point = new Point(place);

    this.map = new Map({
      view: new View({
        center: place,
        zoom: 6,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        })
      ],
      target: 'ol-map'
    });
    console.log(this.map);
  }

}
