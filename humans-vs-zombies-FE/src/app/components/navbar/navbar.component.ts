import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { environment } from 'src/environments/environment';
const {APIGames} = environment;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  //  private _newGame: Game[] = []
  showModal = false;
  showCreateGameModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }
  toggleCreateGameModal() {
    this.showCreateGameModal = !this.showCreateGameModal;
  }

  constructor(private readonly http: HttpClient) {}

  onGameCreate (game: {gameName: String, gameStartTime: any, gameEndTime: any, nwLat: String, nwLng: string, seLat: String, seLng: String} ){
    console.log(game);
    this.http.post(APIGames, JSON.stringify(game))
      .subscribe((res) => {
        console.log(res);
      });
  }
    

}
