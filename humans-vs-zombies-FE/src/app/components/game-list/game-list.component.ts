import { HttpClient } from '@angular/common/http';
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
import { environment } from 'src/environments/environment';
const {APIGames} = environment;

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
    private readonly http: HttpClient
  ) {}

  @Input() games: Game[] = [];

  public async onJoinGame(game: Game) {
    this.gameService.joinGame(game.id);
    this.gameListService.gameId = game.id;
    StorageUtil.storageSave(StorageKeys.Game, game);
    await this.delay(100);
    this.router.navigateByUrl("/game-view");
  }

  private async delay(ms: number) {
    return await new Promise( resolve => setTimeout(resolve, ms) );
  }

  public async onGameDetails(game: Game) {
    this.gameListService.gameId = game.id;
    StorageUtil.storageSave(StorageKeys.Game, game);
    const user: User | undefined = StorageUtil.storageRead(StorageKeys.User);
    const player: Player | undefined = StorageUtil.storageRead(StorageKeys.Player);
    if (player === undefined)
      this.playerService.setDummyPlayer(user!.id);
    await this.delay(100);
    this.router.navigateByUrl("/game-view");
  }

  public deleteGame(gameId: number): void {
    console.log(gameId);
    this.http.delete(`${APIGames}/${gameId}`).subscribe(() => window.location.reload)
  }
}
