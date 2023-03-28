import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

const { APIGames } = environment;

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent {

  constructor(
    private readonly http: HttpClient,
    ) {}

  acceptedTime: boolean = true;
  createdGame: boolean = false;
  showCreateGameModal = false;

    toggleCreateGameModal() {
    this.showCreateGameModal = !this.showCreateGameModal;
  }

    onGameCreate (game: {name: String, startTime: String, endTime: String, nwLat: String, nwLng: string, seLat: String, seLng: String, maxPlayers: number, registeredPlayers: number} ){
      game.registeredPlayers = 0;

    if (game.endTime > game.startTime){
      this.createdGame = true;
      this.http.post(APIGames + "/add-new-game", game)
      .subscribe(() => {
        window.location.reload();
      });
    } else {
      this.acceptedTime = false;
    }
  }
}
