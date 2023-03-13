import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { GameListService } from 'src/app/services/game-list.service';

@Component({
  selector: 'app-game-list-view',
  templateUrl: './game-list-view.page.html',
  styleUrls: ['./game-list-view.page.css']
})
export class GameListViewPage implements OnInit{

  get games(): Game[] {
    return this.gameService.games;
  }

  get loading(): boolean {
    return this.gameService.loading;
  }
  
  get error(): string {
    return this.gameService.error;
  }

  constructor (private readonly gameService: GameListService) { }

  ngOnInit(): void {
    this.gameService.findAllGames();
  }
}
