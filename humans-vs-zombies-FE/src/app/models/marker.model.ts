import { Feature } from 'ol';

export interface Marker {
  id: number;
  type: markerType;
  vector: Feature;
}

export enum markerType {
  SQUADCHECKIN,
  KILL,
  MISSION,
}
