import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Mission } from 'src/app/models/mission.model';
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
  role = "none";

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
  createdGame: boolean = false;
  showModal = false;
  showCreateGameModal = false;
  showAddMissionModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleCreateGameModal() {
    this.showCreateGameModal = !this.showCreateGameModal;
  }

  toggleameCreated(){
    
  }
  
  toggleAddMissionModal() {
    this.showAddMissionModal = !this.showAddMissionModal;
  }

  login(): void {
    keycloak.login({ redirectUri: 'http://localhost:4200/game-view' });
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
  submit(){
    console.log("from submit");
    this.location.replaceState(this.location.path());
    this.router.navigateByUrl("/game-list-view");


  }

  constructor(private readonly http: HttpClient,
    private readonly location: Location,
    public datepipe: DatePipe,
    private readonly router: Router
    ) {}

}
