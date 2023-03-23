import { Injectable } from '@angular/core';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Player } from '../models/player.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private readonly playerService: PlayerService) {}

  public async joinGame(gameId: number | undefined): Promise<void> {
    const user = StorageUtil.storageRead<User>(StorageKeys.User);
    await this.playerService.setPlayer(gameId, user!.id);
    this.playerService.player.subscribe((player: Player | undefined) => {
      if (player === undefined) this.playerService.createPlayer(gameId, user!);
    });
  }
}
