import { Component, Input, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Squad } from 'src/app/models/squad.model';
import { SquadListService } from 'src/app/services/squad-list.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: []
})
export class SquadListComponent implements OnInit {

  ngOnInit(): void {
    this._player = StorageUtil.storageRead(StorageKeys.Player);
  }

  @Input() squads: Squad[] = [];
  public _player?: any = undefined;
  public showCreateSquadModal = false;

  get player(): any {
    return this._player;
  }

  constructor(private readonly squadListService: SquadListService) {}

  joinSquad(squad: Squad): void {
    const player: any = StorageUtil.storageRead(StorageKeys.Player);
    this.squadListService.joinSquad(squad, player);
    if (this.squadListService.error !== "") {
      alert(this.squadListService.error);
      return;
    }
    window.location.reload();
  }

  createSquad(squadInfo: {name: string}): void {
    console.log(squadInfo);
    this.squadListService.createNewSquad(squadInfo.name, this._player);
    if (this.squadListService.error !== "") {
      alert(this.squadListService.error);
      return;
    }
    //window.location.reload();
  }

  toggleCreateSquadModal(): void {
    this.showCreateSquadModal = !this.showCreateSquadModal;
  }
}
