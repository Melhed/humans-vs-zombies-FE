import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {

  constructor(private readonly router: Router) {}

  @Input() games: Game[] = [];

  onJoinGame() {
    //TODO: Make sure user is authenticated to join, add player to game, update no. of players (make sure it's not full)
    console.log("Join button clicked");
  }

  onGameDetails() {
    //TODO: Make sure the right game is viewed in game-view
    console.log("Game details clicked");
    this.router.navigateByUrl("/game-view");
  }
}
