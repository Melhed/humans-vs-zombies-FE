import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Player } from 'src/app/models/player.model';
import { Squad } from 'src/app/models/squad.model';
import { SquadListService } from 'src/app/services/squad-list.service';
import { PlayerService } from 'src/app/services/player.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: [],
})
export class SquadListComponent implements OnInit {
  constructor(
    private readonly squadListService: SquadListService,
    private readonly playerService: PlayerService
  ) {}
  private _squads: Squad[] = [];
  private _player?: Player = undefined;
  public showCreateSquadModal = false;

  ngOnInit(): void {
    console.log(StorageUtil.storageRead(StorageKeys.Player));
    this.player = StorageUtil.storageRead(StorageKeys.Player)!;

    this.squadListService.squads.subscribe((squads: Squad[]) => {
      if (squads[0]) this._squads = squads;
    });
  }

  get player(): Player {
    return this._player!;
  }

  set player(player: Player) {
    this._player = player;
  }

  get squads(): Squad[] {
    return this._squads;
  }

  joinSquad(squad: Squad): void {
    const player: any = StorageUtil.storageRead(StorageKeys.Player);
    this.squadListService.joinSquad(squad, player);
    if (this.squadListService.error !== '') {
      alert(this.squadListService.error);
      return;
    }
    this.ngOnInit();
    //window.location.reload();
  }

  createSquad(squadInfo: { name: string }): void {
    this.squadListService.createNewSquad(squadInfo.name, this._player);
    if (this.squadListService.error !== '') {
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
