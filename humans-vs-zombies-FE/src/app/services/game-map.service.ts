import { Injectable } from '@angular/core';
import { Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import { LineString, Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { Coordinate } from 'ol/coordinate';

@Injectable({
  providedIn: 'root',
})
export class GameMapService {
  private _map?: Map = undefined;

  public get map(): Map | undefined {
    return this._map;
  }

  public set map(map: Map | undefined) {
    this._map = map;
  }

  public createGameMap(
    nwLat: number,
    nwLng: number,
    seLat: number,
    seLng: number
  ): Map {
    const nw = fromLonLat([nwLat, nwLng]);
    const se = fromLonLat([seLat, seLng]);
    const ne = fromLonLat([nwLat, seLng]);
    const sw = fromLonLat([seLat, nwLng]);

    const view: View = new View({
      center: this.findCenter(nwLat, nwLng, seLat, seLng),
      zoom: 5,
      enableRotation: false,
    });

    const nwNeVector = this.createVectorLayer(nw, ne);
    const nwSwVector = this.createVectorLayer(nw, sw);
    const seSwVector = this.createVectorLayer(se, sw);
    const seNeVector = this.createVectorLayer(se, ne);

    if (this._map === undefined) {
      this._map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: 'ol-map',
      });
    }
    this._map.setView(view);
    this._map.addLayer(nwNeVector);
    this._map.addLayer(nwSwVector);
    this._map.addLayer(seSwVector);
    this._map.addLayer(seNeVector);

    return this._map;
  }

  public findCenter(
    nwLat: number,
    nwLng: number,
    seLat: number,
    seLng: number
  ): Coordinate {
    const centerLat: number = ((seLat - nwLat) / 2) + nwLat;
    const centerLng: number = ((seLng - nwLng) / 2) + nwLng;
    return fromLonLat([centerLat, centerLng]);
  }

  private createVectorLayer(nw: Coordinate, se: Coordinate): any {
    const lineFeature = new Feature({
      geometry: new LineString([nw, se]),
      name: 'lineString',
    });

    const lineVectorSource = new VectorSource({
      features: [lineFeature],
      wrapX: false,
      overlaps: false,
    });

    const lineStyle = new Style({
      stroke: new Stroke({
        color: 'black',
        width: 2,
      }),
    });

    return new VectorLayer({
      source: lineVectorSource,
      style: lineStyle,
    });
  }

  constructor() {}
}
