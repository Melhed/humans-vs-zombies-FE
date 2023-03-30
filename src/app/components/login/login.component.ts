import { Component } from '@angular/core';
import { StorageUtil } from 'src/app/utils/storage.util';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  public isAuthenticated: boolean = false;

  get authenticated(): boolean {
    return Boolean(keycloak.authenticated);
  }

  ngOnInit(): void {
    this.isAuthenticated = Boolean(keycloak.authenticated);
    if (this.authenticated) {
      keycloak.redirectUri = window.location.origin + '/game-list-view';
    }
  }

  doLogin(): void {
    keycloak.login({ redirectUri: 'http://localhost:4200/game-list-view' });
  }

  doLogout(): void {
    StorageUtil.storageClear();
    keycloak.logout();
  }
}
