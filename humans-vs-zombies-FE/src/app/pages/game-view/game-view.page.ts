import { Component, OnInit } from '@angular/core';
import { SquadListService } from 'src/app/services/squad-list.service';
import { Squad } from 'src/app/models/squad.model';
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.page.html',
  styleUrls: ['./game-view.page.css']
})
export class GameViewPage implements OnInit{
    showModal = false;
    toggleModal() {
      this.showModal = !this.showModal;
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
    constructor(
      private readonly squadListService: SquadListService
    ){}

    ngOnInit(): void {
        this.squadListService.findAllSquads();
    }
}
