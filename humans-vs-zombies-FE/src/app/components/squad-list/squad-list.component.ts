import { Component, Input, OnInit } from '@angular/core';
import { Squad } from 'src/app/models/squad.model';
import { GameListService } from 'src/app/services/game-list.service';

@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: []
})
export class SquadListComponent implements OnInit{

  @Input() squads: Squad[] = [];

  constructor(private readonly gameListService: GameListService) {}
  ngOnInit(): void {
    console.log("this.gameListService.gameId " + localStorage.getItem('id'));
  }
}
