import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { EditPlayerService } from 'src/app/services/edit-player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit{

  constructor(private readonly editPlayerService: EditPlayerService){}
  @Input() players: Player[] = [];
  ngOnInit(): void {
    console.log(this.editPlayerService.findAllPlayers);
      this.editPlayerService.findAllPlayers;
  }
}
