import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Game } from 'src/app/models/game.model';
import { environment } from 'src/environments/environment';
const {APIGames} = environment;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
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
  
  acceptedTime: boolean = true;
  showModal = false;
  showCreateGameModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }
  toggleCreateGameModal() {
    this.showCreateGameModal = !this.showCreateGameModal;
  }

  constructor(private readonly http: HttpClient) {}

  onGameCreate (game: {name: String, startTime: String, endTime: String, nwLat: String, nwLng: string, seLat: String, seLng: String} ){
    this._newGame = game;
    
    if(game.endTime > game.startTime){
      console.log(game);
    this.http.post(APIGames + "/add-new-game", game)
      .subscribe((res) => {
        console.log(res);
      });
    }else{
      this.acceptedTime = false;
    }
    
  }

  ngOnInit(): void {
    
  }
    

}
