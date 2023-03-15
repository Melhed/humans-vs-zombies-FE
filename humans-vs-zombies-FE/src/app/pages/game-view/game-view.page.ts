import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import keycloak from 'src/keycloak';
import { UserService } from 'src/app/services/user.service';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.page.html',
  styleUrls: ['./game-view.page.css'],
})
export class GameViewPage implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}
  private user?: User = undefined;

  async ngOnInit(): Promise<void> {

    let keycloakUser: KeycloakProfile = await keycloak.loadUserProfile();
    let user: User = {
      id: keycloakUser.id!,
      first_name: keycloakUser.firstName!,
      last_name: keycloakUser.lastName!,
    };
    // this.userService.fetchUser(user.id).subscribe({next: (user: User) => this.user = user});
    // console.log(this.user);
    this.userService.handleUserLogin(user);
  }

  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
