import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { User } from 'src/app/models/user.model';
import { EditPlayerService } from 'src/app/services/edit-player.service';
import { UserService } from 'src/app/services/user.service';
import keycloak from 'src/keycloak';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.page.html',
  styleUrls: ['./edit-player.page.css']
})
export class EditPlayerPage implements OnInit{

  get players(): Player[] {
    return this.editPlayerService.players;
  }

  get loading(): boolean {
    return this.editPlayerService.loading;
  }

  get error(): string {
    return this.editPlayerService.error;
  }

  private user?: User = undefined;

  constructor (private readonly editPlayerService: EditPlayerService, 
    private readonly userService: UserService) { }

    async ngOnInit(): Promise<void> {
    this.editPlayerService.findAllPlayers();
    this.editPlayerService.getGamePlayers();
    let keycloakUser: KeycloakProfile = await keycloak.loadUserProfile();
    let user: User = {
      id: keycloakUser.id!,
      firstName: keycloakUser.firstName!,
      lastName: keycloakUser.lastName!,
    };

    this.userService.handleUserLogin(user);
  }

}
