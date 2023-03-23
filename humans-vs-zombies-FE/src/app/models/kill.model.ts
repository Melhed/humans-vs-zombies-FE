export interface Kill {
  id: number;
  timeOfDeath: string;
  story?: string;
  lat?: number;
  lng?: number;
  game: number;
  killer: number;
  victim: number;
}
