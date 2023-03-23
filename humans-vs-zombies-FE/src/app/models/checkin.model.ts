export interface Checkin {
  id: number;
  timeStamp: String;
  lat: String;
  lng: String;
  gameId?: number;
  squadId?: number;
  squadMemberId?: number;
}
