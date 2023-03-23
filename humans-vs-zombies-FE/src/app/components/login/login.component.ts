import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  public isAuthenticated: boolean = false;

  get authenticated(): boolean {
    return Boolean(keycloak.authenticated);
  }

  ngOnInit(): void {
    this.isAuthenticated = Boolean(keycloak.authenticated);
  }

  doLogin(): void {
    keycloak.login({ redirectUri: 'http://localhost:4200/game-list-view' });
  }

  doLogout(): void {
    keycloak.logout();
  }
}
