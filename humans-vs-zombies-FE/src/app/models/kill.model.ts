export interface Kill {
  id: number;
  timeOfDeath: String;
  story?: String;
  lat?: String;
  lng?: String;
  game: number;
  killer: number;
  victim: number;
}
