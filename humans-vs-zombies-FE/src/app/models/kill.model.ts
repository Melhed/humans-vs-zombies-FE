export interface Kill {
  id: number;
  timeOfDeath: String;
  story?: String;
  lat?: number;
  lng?: number;
  game: number;
  killer: number;
  victim: number;
}
