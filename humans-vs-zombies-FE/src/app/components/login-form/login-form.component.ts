import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  public isAuthenticated: boolean = false;

  get authenticated(): boolean {
    return Boolean(keycloak.authenticated);
  }

  ngOnInit(): void {
    this.isAuthenticated = Boolean(keycloak.authenticated);
    if (this.isAuthenticated) {
      console.log(keycloak.token);
    }
  }

  doLogin(): void {
    keycloak.login({ redirectUri: 'http://localhost:4200/game-list-view' });
  }

  doLogout(): void {
    keycloak.logout();
  }

  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
