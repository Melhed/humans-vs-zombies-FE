import { Component, OnInit, Injectable } from '@angular/core';
import { SquadListService } from 'src/app/services/squad-list.service';
import { Squad } from 'src/app/models/squad.model';
import { GameListService } from 'src/app/services/game-list.service';

@Injectable()
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.page.html',
  styleUrls: [],
})
export class GameViewPage implements OnInit {
  constructor(
    private readonly squadListService: SquadListService,
    private readonly gameListService: GameListService
  ) {}

  gameId: any = this.gameListService.gameId;
  gameToShow: any = [];

  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }

  showBiteCodeModal = false;
  toggleBiteCodeModal() {
    this.showBiteCodeModal = !this.showBiteCodeModal;
  }

  get squads(): Squad[] {
    return this.squadListService.squads;
  }

  get loading(): boolean {
    return this.squadListService.loading;
  }
  get error(): String {
    return this.squadListService.error;
  }

  ngOnInit(): void {
    this.squadListService.findAllSquads();
    this.gameListService
      .getGameById(localStorage.getItem('game-id'))
      .subscribe((game) => {
        this.gameToShow = game;
      });
  }
}
