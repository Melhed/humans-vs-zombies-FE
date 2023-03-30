import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Player } from 'src/app/models/player.model';
import { Squad } from 'src/app/models/squad.model';
import { SquadListService } from 'src/app/services/squad-list.service';
import { SquadService } from 'src/app/services/squad.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: [],
})
export class SquadListComponent implements OnInit {
  constructor(
    private readonly squadListService: SquadListService,
    private readonly squadService: SquadService
  ) {}
  private _player?: Player = undefined;
  public showCreateSquadModal = false;

  public get loading(): boolean {
    return this.squadListService.loading;
  }

  public get squads(): Observable<Squad[]> {
    return this.squadListService.squads;
  }

  ngOnInit(): void {
    this.squadService.findPlayersSquad();
    this.player = StorageUtil.storageRead(StorageKeys.Player)!;
    this.squadService.currentPlayerSquad.subscribe(
      (squad: Squad | undefined) => {
        if (squad) console.log(squad);
      }
    );
  }

  get player(): Player {
    return this._player!;
  }

  set player(player: Player) {
    this._player = player;
  }

  public async joinSquad(squad: Squad): Promise<void> {
    this.squadListService.joinSquad(squad);
    if (this.squadListService.error !== '') {
      alert(this.squadListService.error);
      return;
    }
    await this.delay(500);
    this.ngOnInit();
    window.location.reload();
  }

  private async delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async createSquad(squadInfo: { name: string }): Promise<void> {
    this.squadListService.createNewSquad(squadInfo.name, this._player);
    if (this.squadListService.error !== '') {
      alert(this.squadListService.error);
      return;
    }
    await this.delay(100);
    this.player = StorageUtil.storageRead(StorageKeys.Player)!;
    this.ngOnInit();
    window.location.reload();
  }

  public toggleCreateSquadModal(): void {
    this.showCreateSquadModal = !this.showCreateSquadModal;
  }
}
