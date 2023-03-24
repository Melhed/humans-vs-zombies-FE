export interface SquadCheckin {
  id?: number;
  timeStamp: string;
  lat: number;
  lng: number;
  gameId?: number;
  squadId?: number;
  squadMemberId?: number;
}
