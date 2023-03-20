import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GameListService } from 'src/app/services/game-list.service';
import { GameService } from 'src/app/services/game.service';

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

  onJoinGame(id: any) {
    console.log(id);

    this.gameService.joinGame(id);
    this.onGameDetails(id);
  }

  onGameDetails(id: any) {
    console.log(id);

    this.gameListService.gameId = id;
    localStorage.setItem('game-id', id);
    this.router.navigateByUrl("/game-view");
  }
}
