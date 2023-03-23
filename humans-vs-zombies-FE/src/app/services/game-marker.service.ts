import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import Icon from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import { Mission } from '../models/mission.model';
import { markerType } from '../models/marker.model';
import { fromLonLat } from 'ol/proj';
import { Kill } from '../models/kill.model';

@Injectable({
  providedIn: 'root',
})
export class GameMarkerService {
  constructor() {}

  public createMissionMarkers(missions: Mission[]): VectorLayer<VectorSource> {
    let markers: Feature[] = [];

    markers.push(this.createMarker(300, 300, markerType.MISSION, 10));

    missions.map((mission: Mission) => {
      if(mission.lat !== undefined && mission.lng !== undefined) {
        markers.push(this.createMarker(mission.lng, mission.lat, markerType.MISSION, mission.id!));
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

  public createKillMarkerLayer(kills: Kill[]): VectorLayer<VectorSource> {
    let features: Feature[] = [];

    features.push(this.createMarker(400, 300, markerType.KILL, 10));
    features.push(this.createMarker(300, 400, markerType.KILL, 10));

    kills.map((kill: Kill) => {
      if (kill.lat !== undefined && kill.lng !== undefined) {
        features.push(
          this.createMarker(kill.lng, kill.lat, markerType.KILL, kill.id)
        );
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
        }),
      }),
    });

    return markerLayer;
  }

  private createMarker(
    lng: number,
    lat: number,
    markerType: markerType,
    markerEventId: number
  ): Feature {
    const feature = new Feature({
      geometry: new Point(fromLonLat([lng, lat])),
      wrapX: false,
      enableRotation: false,
    });

    feature.setProperties({ id: markerEventId, type: markerType });
    return feature;
  }
}
