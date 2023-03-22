import { Component, Input, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Player } from 'src/app/models/player.model';
import { Squad } from 'src/app/models/squad.model';
import { SquadListService } from 'src/app/services/squad-list.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: []
})
export class SquadListComponent implements OnInit {
  constructor(private readonly squadListService: SquadListService) {}

  ngOnInit(): void {
    this._player = StorageUtil.storageRead(StorageKeys.Player);
    this.squadListService.findAllSquads();
    this.squadListService.squads.subscribe((squads: Squad[]) => {
      if (squads[0])
        this._squads = squads;
    });
  }

  public _squads: Squad[] = [];
  public _player?: Player = undefined;
  public showCreateSquadModal = false;

  get player(): Player | undefined {
    return this._player;
  }

  get squads(): Squad[] {
    return this._squads;
  }

  joinSquad(squad: Squad): void {
    const player: any = StorageUtil.storageRead(StorageKeys.Player);
    this.squadListService.joinSquad(squad, player);
    if (this.squadListService.error !== "") {
      alert(this.squadListService.error);
      return;
    }
    this.ngOnInit();
    //window.location.reload();
  }

  createSquad(squadInfo: {name: string}): void {
    this.squadListService.createNewSquad(squadInfo.name, this._player);
    if (this.squadListService.error !== "") {
      alert(this.squadListService.error);
      return;
    }
    this.ngOnInit();
    // window.location.reload();
  }

  toggleCreateSquadModal(): void {
    this.showCreateSquadModal = !this.showCreateSquadModal;
  }
}
