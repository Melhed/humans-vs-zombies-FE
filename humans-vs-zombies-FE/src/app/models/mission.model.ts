export interface Mission {
  id?: number;
  name: String;
  description?: String;
  startTime?: Date;
  endTime?: Date;
  lat?: number;
  lng?: number;
  isHumanVisible: boolean;
  isZombieVisible: boolean;
  gameId?: number;
}
