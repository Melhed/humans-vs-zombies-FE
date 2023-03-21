import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

import keycloak from 'src/keycloak';
import { Router } from '@angular/router';
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

    console.log("from submit -------> ");
    this.location.replaceState(this.location.path());
    
    

  }

  ngOnInit(): void {
    this.isAuthenticated = Boolean(keycloak.authenticated);
    if(this._newGame.endTime > this._newGame.startTime){

    }
  }
  submit(){
    console.log("from submit");
    this.location.replaceState(this.location.path());
    this.router.navigateByUrl("/game-list-view");

  }

  constructor(private readonly http: HttpClient,
    private readonly location: Location,
    private readonly router: Router
    ) {}
}
