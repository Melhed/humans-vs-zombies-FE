import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import Icon from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import { Mission } from '../models/mission.model';
import { Marker, MarkerType } from '../models/marker.model';
import { fromLonLat, transform } from 'ol/proj';
import { Kill } from '../models/kill.model';
import Geometry from 'ol/geom/Geometry';
import { BehaviorSubject, Observable } from 'rxjs';
import { KillService } from './kill.service';
import { SquadCheckin } from '../models/squad-checkin.model';

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
    if (markerProperties.type === MarkerType.KILL) {
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

  public createMissionMarkers(missions: Mission[]): VectorLayer<VectorSource> {
    let markers: Feature[] = [];

    markers.push(this.createMarker(300, 300, MarkerType.MISSION, 10));

    missions.map((mission: Mission) => {
      if (mission.lat !== undefined && mission.lng !== undefined) {
        markers.push(
          this.createMarker(
            mission.lng,
            mission.lat,
            MarkerType.MISSION,
            mission.id!
          )
        );
      }
    });

    let markerLayer: VectorLayer<VectorSource> = new VectorLayer({
      source: new VectorSource({
        features: markers,
      }),
      style: new Style({
        image: new Icon({
          src: `../../assets/Mission_Marker_64.png`,
          anchor: [0.5, 1],
        }),
      }),
    });
    return markerLayer;
  }

  public createMissionMarkerLayer(
    missions: Mission[]
  ): VectorLayer<VectorSource> {
    let features: Feature[] = [];

    missions.map((mission: Mission) => {
      if (mission.lat !== undefined && mission.lng !== undefined) {
        let marker: Feature<Geometry> = this.createMarker(
          mission.lng,
          mission.lat,
          MarkerType.KILL,
          mission.id!
        );
        features.push(marker);
      }
    });

    let markerLayer: VectorLayer<VectorSource> = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
      style: new Style({
        image: new Icon({
          src: `../../assets/Mission_Marker_64.png`,
          anchor: [0.5, 1],
          size: [64, 64],
          scale: 0.5,
        }),
      }),
    });

    return markerLayer;
  }

  public createSquadCheckinMarkerLayer(
    squadCheckins: SquadCheckin[]
  ): VectorLayer<VectorSource> {
    let features: Feature[] = [];

    squadCheckins.map((checkin: SquadCheckin) => {
      let marker: Feature<Geometry> = this.createMarker(
        checkin.lng,
        checkin.lat,
        MarkerType.SQUADCHECKIN,
        checkin.id!
      );
      features.push(marker);
    });

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

  public createKillMarkerLayer(kills: Kill[]): VectorLayer<VectorSource> {
    let features: Feature[] = [];

    kills.map((kill: Kill) => {
      if (kill.lat !== undefined && kill.lng !== undefined) {
        let marker: Feature<Geometry> = this.createMarker(
          kill.lng,
          kill.lat,
          MarkerType.KILL,
          kill.id
        );
        features.push(marker);
      }
    });

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
    markerType: MarkerType,
    markerEventId: number
  ): Feature {
    const feature = new Feature({
      geometry: new Point(fromLonLat([lng, lat])),
    });

    feature.setProperties({ id: markerEventId, type: markerType });
    return feature;
  }
}
