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
  acceptedTime: boolean = true;
  showUpdateGameModal: boolean = false;
  toggleUpdateGameModal() {
    this.showUpdateGameModal = !this.showUpdateGameModal;
    this.setDefault();
  }

  onUpdateGame(form: FormGroup){

    const start = new Date(this.reactiveForm.get("startTime")?.value);
    const end = new Date(this.reactiveForm.get("endTime")?.value);
    console.log(this.reactiveForm.get("endTime")?.value);
    console.log(this.reactiveForm.get("startTime")?.value); 
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
      console.log("from else")
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
