import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Game } from 'src/app/models/game.model';
import { GameListService } from 'src/app/services/game-list.service';
import { GameService } from 'src/app/services/game.service';
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
  ) {}

  @Input() games: Game[] = [];

  onJoinGame(game: Game) {
    this.gameService.joinGame(game.id);
    this.onGameDetails(game);
  }

  onGameDetails(game: Game) {
    this.gameListService.gameId = game.id;
    StorageUtil.storageSave(StorageKeys.Game, game);
    this.router.navigateByUrl("/game-view");
  }
}
