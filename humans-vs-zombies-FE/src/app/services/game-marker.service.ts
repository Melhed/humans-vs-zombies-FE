import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import Icon from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import { Coordinate, wrapX } from 'ol/coordinate';
import { Mission } from '../models/mission.model';
import { Marker, markerType } from '../models/marker.model';
import { fromLonLat, transform } from 'ol/proj';
import { Kill } from '../models/kill.model';
import Geometry from 'ol/geom/Geometry';
import { BehaviorSubject, Observable } from 'rxjs';
import { KillService } from './kill.service';

@Injectable({
  providedIn: 'root',
})
export class GameMarkerService {
  constructor(private readonly killService: KillService) {}

  _clickedMarkerData$ = new BehaviorSubject<any>(undefined);
  clickedMarkerData = this._clickedMarkerData$.asObservable();

  private updateClickedMarkerData(obj: Object): void {
    this._clickedMarkerData$.next(obj);
  }

  public fetchMarkerData(markerProperties: any): void {
    if (markerProperties.type === 'kill') {
      this.killService.kills.subscribe({
        next: (kills: Kill[]) => {
          kills.forEach((kill) => {
            if (kill.id === markerProperties.id)
              this.updateClickedMarkerData(kill);
          });
        },
      });
    }
  }

  public createMissionMarkers(missions: Mission[]): Marker[] {
    let markers: Marker[] = [];

    return markers;
  }

  public createKillMarkerLayer(kills: Kill[]): VectorLayer<VectorSource> {
    let features: Feature[] = [];

    features.push(this.createMarker(200, 55, 'kill', 11));
    features.push(this.createMarker(420, 50, 'kill', 10));

    kills.map((kill: Kill) => {
      if (kill.lat !== undefined && kill.lng !== undefined) {
        let marker: Feature<Geometry> = this.createMarker(
          kill.lng,
          kill.lat,
          'kill',
          kill.id
        );
        features.push(marker);
      }
    });

    console.log(features);

    let markerLayer: VectorLayer<VectorSource> = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
      style: new Style({
        image: new Icon({
          src: `../../assets/Grave_Marker_64.png`,
          anchor: [0.5, 1],
          size: [64, 64],
          scale: 0.5,
        }),
      }),
    });

    return markerLayer;
  }

  private createMarker(
    lng: number,
    lat: number,
    markerType: string,
    markerEventId: number
  ): Feature {
    const feature = new Feature({
      geometry: new Point(fromLonLat([lng, lat])),
    });

    feature.setProperties({ id: markerEventId, type: markerType });
    return feature;
  }
}
