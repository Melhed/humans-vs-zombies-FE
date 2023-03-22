import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Mission } from 'src/app/models/mission.model';
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

  private _mission: any = {
    "title": "",
    "description": ""
  }

  public getMissions (): Mission[] {
    return this._mission;
  }

  public isAuthenticated: boolean = false;

  get authenticated(): boolean {
    return Boolean(keycloak.authenticated);
  }

  acceptedTime: boolean = true;
  showModal = false;
  showCreateGameModal = false;
  showAddMissionModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleCreateGameModal() {
    this.showCreateGameModal = !this.showCreateGameModal;
  }

  toggleAddMissionModal() {
    this.showAddMissionModal = !this.showAddMissionModal;
  }

  printToken() {
    console.log(keycloak.idTokenParsed);
  }

  role = "none";

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

  onAddMission(mission: {title: String, description: String, startTime: Date, endTime: Date, lat: number, lng: number, humanVisible: boolean, zombieVisible: boolean, gameId: number}) {
    this._mission = mission;

    let date = this.datepipe.transform((new Date), 'dd/MM/yyy h:mm:ss')!;
    console.log(date);

    if(mission.endTime > mission.startTime || mission.startTime.toString() < date) {
      this.http.post(APIGames + "/" + localStorage.getItem('game-id') + "/mission", mission)
      .subscribe((response) => {
        console.log(response);
      });
    } else {
      console.log("Check the times");
      alert("End time of mission before start time, redo please :)");
    }
  }

  ngOnInit(): void {
    this.isAuthenticated = Boolean(keycloak.authenticated);
    console.log(this.role);
    if(keycloak.realmAccess?.roles.includes("hvz-admin"))
      this.role = "hvz-admin";
    console.log(this.role);

    if(this._newGame.endTime > this._newGame.startTime){

    }
  }

  constructor(
    private readonly http: HttpClient,
    public datepipe: DatePipe) {}
}
