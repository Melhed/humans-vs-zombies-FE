import { Feature } from 'ol';

export interface Marker {
  id: number;
  type: MarkerType;
  vector: Feature;
}

export enum MarkerType {
  SQUADCHECKIN = 'SQUADCHECKIN',
  KILL = 'KILL',
  MISSION = 'MISSION',
}
