import { Injectable } from '@angular/core';
import keycloak from 'src/keycloak';
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

  public joinGame(gameId: number | undefined): void {
    const user = StorageUtil.storageRead<User>(StorageKeys.User);
    console.log(keycloak.hasRealmRole('hvz-admin'));

    this.playerService.handlePlayerAccess(gameId!, user!);
    // this.playerService.player.subscribe((player: Player | undefined) => {
    //   if (player === undefined) {
    //     if (keycloak.hasRealmRole('hvz-admin')) {
    //       this.playerService.createPlayerAdmin(gameId, user!);
    //       return;
    //     }
    //     this.playerService.createPlayer(gameId, user!);
    //   }
    //   this.playerService.setPlayer(gameId, user!.id);
    // });
  }
}
