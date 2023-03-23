import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

const { APIGames } = environment;

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent {

  constructor(
    private readonly http: HttpClient,
    private readonly location: Location,
    private readonly router: Router,
    ) {}

  private _newGame: any = {
    "name": "",
    "startTime": "",
    "endTime": "",
    "nwLat": 0,
    "nwLng": 0,
    "seLat": 0,
    "seLng": 0
  };

  acceptedTime: boolean = true;
  createdGame: boolean = false;
  showCreateGameModal = false;

    toggleCreateGameModal() {
    this.showCreateGameModal = !this.showCreateGameModal;
  }

    onGameCreate (game: {name: String, startTime: String, endTime: String, nwLat: String, nwLng: string, seLat: String, seLng: String} ){
    this._newGame = game;

    if (game.endTime > game.startTime){
      this.createdGame = true;
      this.http.post(APIGames + "/add-new-game", game)
      .subscribe((res) => {
        console.log(res);
      });
      this.location.go(this.location.path());
      window.location.reload();
      
    } else {
      this.acceptedTime = false;
    }
  }

    submit(){
    console.log("from submit");
    this.location.replaceState(this.location.path());
    this.router.navigateByUrl("/game-list-view");
  }
}
