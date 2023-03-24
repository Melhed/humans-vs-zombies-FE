import { Component, OnInit } from '@angular/core';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})

export class NavbarComponent implements OnInit{
  role = "none";

  public isAuthenticated: boolean = false;

  get authenticated(): boolean {
    return Boolean(keycloak.authenticated);
  }

  ngOnInit(): void {
    this.isAuthenticated = Boolean(keycloak.authenticated);
    if(keycloak.realmAccess?.roles.includes("hvz-admin"))
      this.role = "hvz-admin";
  }

  constructor() {}

}
