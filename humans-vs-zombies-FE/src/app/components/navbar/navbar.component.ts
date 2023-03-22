import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import keycloak from 'src/keycloak';
const {APIGames} = environment;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})

export class NavbarComponent implements OnInit{
  private _newGame: any = {
    "name": "",
    "startTime": "",
    "endTime": "",
    "nwLat": 0,
    "nwLng": 0,
    "seLat": 0,
    "seLng": 0
  };

  public isAuthenticated: boolean = false;

  get authenticated(): boolean {
    return Boolean(keycloak.authenticated);
  }

  acceptedTime: boolean = true;
  showModal = false;
  showCreateGameModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleCreateGameModal() {
    this.showCreateGameModal = !this.showCreateGameModal;
  }

  //Printing keycloak token for testing ---REMOVE LATER---
  printToken() {
    console.log(keycloak.idToken)
  }

  logout() {
    keycloak.logout({ redirectUri: 'http://localhost:4200/login' });
  }

  login() {
    keycloak.login({ redirectUri: 'http://localhost:4200/game-list-view' });
  }

  refresh() {
    keycloak.refreshToken;
    console.log(keycloak.idToken);
  }

  onGameCreate (game: {name: String, startTime: String, endTime: String, nwLat: String, nwLng: string, seLat: String, seLng: String} ){
    this._newGame = game;

    if (game.endTime > game.startTime){
      this.http.post(APIGames + "/add-new-game", game)
      .subscribe((res) => {
        console.log(res);
      });
    } else {
      console.log("from else")
      this.acceptedTime = false;
    }

  }

  ngOnInit(): void {
    this.isAuthenticated = Boolean(keycloak.authenticated);
    if(this._newGame.endTime > this._newGame.startTime){

    }
  }

  constructor(private readonly http: HttpClient) {}
}
