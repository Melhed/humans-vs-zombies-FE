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
import Icon from 'ol/style/Icon';

@Injectable({
  providedIn: 'root'
})
export class GameMapService {
  private _map?: Map = undefined;

  public get map(): Map | undefined {
    return this._map;
  }

  public set map(map: Map | undefined) {
    this._map = map
  }

  public addMarker(coords: Coordinate, isMission: boolean): void {
    let iconName: String = 'Grave_Marker_64.png';
    if (isMission) {
      iconName = 'Mission_Marker_64.png';
    }
    let marker: any = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(coords),
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          src: `../../assets/${iconName}`,
          anchor: [0.5, 1],
        }),
      }),
    });

    console.log(iconName);
    this._map?.addLayer(marker);
  }

  public createGameMap(nwLat: number, nwLng: number, seLat: number, seLng: number): Map | undefined {
    const nw = fromLonLat([nwLat, nwLng]);
    const se = fromLonLat([seLat, seLng]);
    const ne = fromLonLat([nwLat, seLng]);
    const sw = fromLonLat([seLat, nwLng]);

    const nwNeVector = this.createVectorLayer(nw, ne);
    const nwSwVector = this.createVectorLayer(nw, sw);
    const seSwVector = this.createVectorLayer(se, sw);
    const seNeVector = this.createVectorLayer(se, ne);

    this._map = new Map({
      view: new View({
        center: this.findCenter(nwLat, nwLng, seLat, seLng),
        zoom: 2,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        nwNeVector,
        nwSwVector,
        seSwVector,
        seNeVector
      ],
      target: 'ol-map'
    });
    return this._map;
  }


  public findCenter(nwLat: any, nwLng: number, seLat: number, seLng: number): Coordinate {
    const centerLat: number = ((seLat - nwLat) / 2) + nwLat;
    const centerLng: number = ((nwLng - seLng) / 2) + nwLng;
    return fromLonLat([centerLat, centerLng]);
  }


  private createVectorLayer(nw: Coordinate, se: Coordinate): any {
    const line_feat1 = new Feature({
      geometry: new LineString([nw, se]),
      name: "lineString"
    })

    const line_vsrc = new VectorSource({
      features: [line_feat1],
      wrapX: false
    });

    const lineStyle = new Style({
      stroke: new Stroke({
        color: "black",
        width: 2,
        lineCap: "butt"
      })
    })

    return new VectorLayer({
      source: line_vsrc,
      style: lineStyle
    })
  }

  constructor() { }
}
