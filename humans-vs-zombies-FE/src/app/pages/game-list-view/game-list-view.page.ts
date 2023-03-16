import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { Game } from 'src/app/models/game.model';
import { User } from 'src/app/models/user.model';
import { GameListService } from 'src/app/services/game-list.service';
import { UserService } from 'src/app/services/user.service';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-game-list-view',
  templateUrl: './game-list-view.page.html',
  styleUrls: []
})
export class GameListViewPage implements OnInit{

  get games(): Game[] {
    return this.gameService.games;
  }

  get loading(): boolean {
    return this.gameService.loading;
  }

  get error(): string {
    return this.gameService.error;
  }

  private user?: User = undefined;

  constructor (private readonly gameService: GameListService, private readonly userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.gameService.findAllGames();
    let keycloakUser: KeycloakProfile = await keycloak.loadUserProfile();
    let user: User = {
      id: keycloakUser.id!,
      firstName: keycloakUser.firstName!,
      lastName: keycloakUser.lastName!,
    };

    this.userService.handleUserLogin(user);
  }
}
