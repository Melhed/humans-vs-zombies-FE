export interface Chat {
  id?: number,
  message: string,
  timestamp: string,
  humanGlobal: boolean,
  zombieGlobal: boolean,
  playerId: number,
  gameId: number,
  squadId?: number
}
