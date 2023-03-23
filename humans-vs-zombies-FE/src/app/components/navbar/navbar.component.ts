import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

import keycloak from 'src/keycloak';
import { Router } from '@angular/router';
const { APIGames } = environment;

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

  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  ngOnInit(): void {
    this.isAuthenticated = Boolean(keycloak.authenticated);
    console.log(this.role);
    if(keycloak.realmAccess?.roles.includes("hvz-admin"))
      this.role = "hvz-admin";
    console.log(this.role);
  }

  constructor() {}

}
