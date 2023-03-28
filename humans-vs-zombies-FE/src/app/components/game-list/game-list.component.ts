import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Game } from 'src/app/models/game.model';
import { Player } from 'src/app/models/player.model';
import { User } from 'src/app/models/user.model';
import { GameListService } from 'src/app/services/game-list.service';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { StorageUtil } from 'src/app/utils/storage.util';
import keycloak from 'src/keycloak';
import { environment } from 'src/environments/environment';
import { PlayerListService } from 'src/app/services/player-list.service';
const {APIGames} = environment;

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly gameListService: GameListService,
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
    private readonly http: HttpClient
  ) {}

  role = "none";

  reactiveForm = new FormGroup({
    name: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    nwLat: new FormControl(),
    nwLng: new FormControl(),
    seLat: new FormControl(),
    seLng:new FormControl()
  })

  @Input() games: Game[] = [];
  acceptedTime: boolean = true;
  showUpdateGameModal: boolean = false;
  toggleUpdateGameModal() {
    this.showUpdateGameModal = !this.showUpdateGameModal;
    this.setDefault();
  }

  onUpdateGame(form: FormGroup){
    const start = new Date(this.reactiveForm.get("startTime")?.value);
    const end = new Date(this.reactiveForm.get("endTime")?.value);
    if(start < end){
      let currentGameValues = {
        name: this.reactiveForm.get("name")?.value,
        startTime: this.reactiveForm.get("startTime")?.value,
        endTime:this.reactiveForm.get("endTime")?.value,
        nwLat: this.reactiveForm.get("nwLat")?.value,
        nwLng: this.reactiveForm.get("nwLng")?.value,
        seLat: this.reactiveForm.get("seLat")?.value,
        seLng: this.reactiveForm.get("seLng")?.value,
      }

      this.reactiveForm.setValue(currentGameValues);
      this.gameListService.updateGame(currentGameValues);
      this.showUpdateGameModal = !this.showUpdateGameModal;

    }else{
      this.acceptedTime = false;
    }
  }

  setDefault() {
    let currentGame = this.games.find((game) => {return game.id === Number(localStorage.getItem('game-id'))});

    let contact = {
      name: currentGame?.name,
      startTime: currentGame?.startTime,
      endTime: currentGame?.endTime,
      nwLat: currentGame?.nwLat,
      nwLng: currentGame?.nwLng,
      seLat: currentGame?.seLat,
      seLng: currentGame?.seLng
    };

    this.reactiveForm.setValue(contact);
  }

  public saveGameToStorageAndRedirect(game: Game) {
    this.gameListService.gameId = game.id;
    StorageUtil.storageSave(StorageKeys.Game, game);
    this.router.navigateByUrl("/game-view");
  }

  public async onJoinGame(game: Game) {
    // if(game.registeredPlayers < game.maxPlayers && keycloak.authenticated) {
    //   game.registeredPlayers++;
    //   this.gameService.updateObjectProperty(game.id!, game.registeredPlayers);
    // } else if (game.registeredPlayers >= game.maxPlayers) {
    //   alert("This game is full");
    // } else if (!keycloak.authenticated) {
    //   alert("You need to login");
    // }
    this.gameService.joinGame(game.id);
    await this.delay(100);
    this.saveGameToStorageAndRedirect(game);
  }

  public async onGameDetails(game: Game) {
    if(!keycloak.authenticated) {
      alert("You need to login");
    }
    const user: User | undefined = StorageUtil.storageRead(StorageKeys.User);
    const player: Player | undefined = StorageUtil.storageRead(StorageKeys.Player);
    if (player === undefined)
      this.playerService.setDummyPlayer(user!.id);
    await this.delay(100);
    this.saveGameToStorageAndRedirect(game);
  }

  private async delay(ms: number) {
    return await new Promise( resolve => setTimeout(resolve, ms) );
  }

  public deleteGame(gameId: number): void {
    this.http.delete(`${APIGames}/${gameId}`).subscribe(() => window.location.reload)
  }

  ngOnInit(): void {
    if(keycloak.realmAccess?.roles.includes("hvz-admin"))
      this.role = "hvz-admin";
  }
}

