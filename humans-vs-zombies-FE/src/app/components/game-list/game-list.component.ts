import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Game } from 'src/app/models/game.model';
import { GameListService } from 'src/app/services/game-list.service';
import { GameService } from 'src/app/services/game.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import keycloak from 'src/keycloak';

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

  saveGameToStorageAndRedirect(game: Game) {
    this.gameListService.gameId = game.id;
    StorageUtil.storageSave(StorageKeys.Game, game);
    this.router.navigateByUrl("/game-view");
  }

  onJoinGame(game: Game) {
    if(game.registeredPlayers < game.maxPlayers && keycloak.authenticated) {
      game.registeredPlayers++;
      this.gameService.updateObjectProperty(game.id!, game.registeredPlayers);
    } else if (game.registeredPlayers >= game.maxPlayers) {
      alert("This game is full");
    } else if (!keycloak.authenticated) {
      alert("You need to login");
    }
    this.gameService.joinGame(game.id);
    this.saveGameToStorageAndRedirect(game);
  }

  onGameDetails(game: Game) {
    if(!keycloak.authenticated) {
      alert("You need to login");
    }
    this.saveGameToStorageAndRedirect(game);
  }
}
