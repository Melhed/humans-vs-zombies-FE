import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export interface Marker {
  id: number;
  type: markerType;
  vector: VectorLayer<VectorSource>;
}

export enum markerType {
  SQUADCHECKIN,
  KILL,
  MISSION,
}
