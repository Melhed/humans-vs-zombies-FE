import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/consts/storage-keys.enum';
import { Game } from 'src/app/models/game.model';
import { GameListService } from 'src/app/services/game-list.service';
import { GameService } from 'src/app/services/game.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{

  constructor(
    private readonly router: Router,
    private readonly gameListService: GameListService,
    private readonly gameService: GameService,
  ) {}

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

  showUpdateGameModal = false;
  toggleUpdateGameModal() {
    this.showUpdateGameModal = !this.showUpdateGameModal;
    this.setDefault();
  }

  onUpdateGame(){
    let currentGame = this.games.find((game) => {return game.id === Number(localStorage.getItem('game-id'))});
    let currentGameValues = {
      name: this.reactiveForm.get("name")?.value,
      startTime: currentGame?.startTime,
      endTime:currentGame?.endTime,
      nwLat: currentGame?.nwLat,
      nwLng: currentGame?.nwLng,
      seLat: currentGame?.seLat,
      seLng: currentGame?.seLng
    }
    
    this.reactiveForm.setValue(currentGameValues);
    this.gameListService.updateGame(currentGameValues);
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
    console.log(this.reactiveForm.value);
  }

  onJoinGame(game: Game) {
    this.gameService.joinGame(game.id);
    this.onGameDetails(game);
  }

  onGameDetails(game: Game) {
    this.gameListService.gameId = game.id;
    StorageUtil.storageSave(StorageKeys.Game, game);
    this.router.navigateByUrl("/game-view");
  }

  
  ngOnInit(): void {
  }
}
