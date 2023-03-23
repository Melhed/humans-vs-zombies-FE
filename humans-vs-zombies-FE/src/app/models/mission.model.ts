export interface Mission {
  missionID?: number;
  name: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  lat?: number;
  lng?: number;
  isHumanVisible: boolean;
  isZombieVisible: boolean;
  gameId?: number;
}
