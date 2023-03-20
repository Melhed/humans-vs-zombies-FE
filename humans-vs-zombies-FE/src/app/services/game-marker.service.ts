import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import Icon from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import { Coordinate } from 'ol/coordinate';
import { Mission } from '../models/mission.model';
import { Marker, markerType } from '../models/marker.model';
import { fromLonLat } from 'ol/proj';

@Injectable({
  providedIn: 'root',
})
export class GameMarkerService {
  constructor() {}

  public createMissionMarkers(missions: Mission[]): Marker[] {
    let markers: Marker[] = [];

    missions.map((mission: Mission) =>
      markers.push({
        id: mission.id!,
        type: markerType.MISSION,
        vector: this.createMarker(
          fromLonLat([mission.lng!, mission.lng!]),
          true
        ),
      })
    );

    return markers;
  }

  private createMarker(
    coords: Coordinate,
    isMission: boolean
  ): VectorLayer<VectorSource> {
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
        wrapX: false,
      }),
      style: new Style({
        image: new Icon({
          src: `../../assets/${iconName}`,
          anchor: [0.5, 1],
        }),
      }),
    });

    return marker;
  }
}
