import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { User } from 'src/app/models/user.model';
import { GameListService } from 'src/app/services/game-list.service';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {

  constructor(
    private readonly router: Router,
    private readonly gameListService: GameListService,
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
  ) {}

  @Input() games: Game[] = [];

  onJoinGame(game: Game) {
    this.gameService.joinGame(game.id);
    this.gameListService.gameId = game.id;
    StorageUtil.storageSave(StorageKeys.Game, game);
    this.router.navigateByUrl("/game-view");
  }

  onGameDetails(game: Game) {
    this.gameListService.gameId = game.id;
    StorageUtil.storageSave(StorageKeys.Game, game);
    const user: User | undefined = StorageUtil.storageRead(StorageKeys.User);
    const player: Player | undefined = StorageUtil.storageRead(StorageKeys.Player);
    if (player === undefined)
      this.playerService.setDummyPlayer(user!.id);
    this.router.navigateByUrl("/game-view");
  }
}
