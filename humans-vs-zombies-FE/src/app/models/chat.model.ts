export interface Chat {
  id?: number,
  message: string,
  timestamp: string,
  isHumanGlobal: boolean,
  isZombieGlobal: boolean,
  playerId: number,
  gameId: number,
  squadId?: number
}
