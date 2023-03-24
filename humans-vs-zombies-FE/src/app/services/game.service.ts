import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import keycloak from 'src/keycloak';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';
import { GameListService } from './game-list.service';
import { PlayerService } from './player.service';

const {APIGames} = environment;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly gameListService: GameListService,
    private readonly http: HttpClient,) {}

  public joinGame(gameId: number | undefined): void {
    const user = StorageUtil.storageRead<User>(StorageKeys.User);
    this.playerService.setPlayer(gameId, user!.id);
    this.playerService.player.subscribe((player: Player | undefined) => {
      if (player === undefined) {
        if (keycloak.hasRealmRole('hvz-admin')) {
          this.playerService.createPlayerAdmin(gameId, user!);
          return;
        }
        this.playerService.createPlayer(gameId, user!);
      }
    });
  }

  updateObjectProperty(gameId: number, stateValue: any) {
    const game: Game | undefined = this.gameListService.gameByID(gameId);
    if(!game) {
      throw new Error("updateGame: No game with ID: " + gameId);
    }
    game.registeredPlayers = stateValue;
    const url = `${APIGames}/${gameId}`;
    return this.http.put(url, game).subscribe({
      next:(response: any) => {
        console.log("NEXT: " , response);
      },
      error:(error: HttpErrorResponse) => {
        console.log("ERROR: ", error.message);
      }
    });
  }
}
