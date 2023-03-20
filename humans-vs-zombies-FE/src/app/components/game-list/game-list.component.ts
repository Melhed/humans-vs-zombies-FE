import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GameListService } from 'src/app/services/game-list.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
 // gameId: number = 0;

  constructor(private readonly router: Router,
    private readonly gameListService: GameListService) {}

  @Input() games: Game[] = [];

  onJoinGame() {
    console.log("Register button clicked");
  }

  onGameDetails(id: any) {
    this.gameListService.gameId = id;
    localStorage.setItem('id', id);
    this.router.navigateByUrl("/game-view");
  }
}
