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
    console.log("Register button clicked");
  }

  onGameDetails() {
    this.router.navigateByUrl("/game-view");
  }
}
