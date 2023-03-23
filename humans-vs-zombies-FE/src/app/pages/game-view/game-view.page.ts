import { Component, OnInit, Injectable } from '@angular/core';
import { SquadListService } from 'src/app/services/squad-list.service';
import { Squad } from 'src/app/models/squad.model';
import { GameListService } from 'src/app/services/game-list.service';
import { KillService } from 'src/app/services/kill.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';

@Injectable()
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.page.html',
  styleUrls: [],
})
export class GameViewPage implements OnInit {
  constructor(
    private readonly squadListService: SquadListService,
    private readonly gameListService: GameListService,
    private readonly killService: KillService
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

  addKill(kill: {
    biteCode: string;
    story: string;
    lat: string;
    long: string;
  }) {
    const player: any = StorageUtil.storageRead(StorageKeys.Player);
    const killInfo = {
      killPosterId: player.id,
      killerId: player.id,
      biteCode: kill.biteCode,
      story: kill.story,
      lat: kill.lat,
      lng: kill.long,
    };
    this.killService.addKill(killInfo);
    this.toggleBiteCodeModal();
    if (this.killService.mostRecentKill !== undefined) {
      /** TODO: create marker */
      alert('Bite has been registered');
    } else {
      alert(this.killService.error);
    }
  }

  get loading(): boolean {
    return this.squadListService.loading;
  }
  get error(): String {
    return this.squadListService.error;
  }

  ngOnInit(): void {
    this.squadListService.findAllSquads();
    this.gameToShow = StorageUtil.storageRead(StorageKeys.Game);
    // this.gameListService
    //   .getGameById(this.gameToShow)
    //   .subscribe((game) => {
    //     this.gameToShow = game;
    //   });
  }
}
