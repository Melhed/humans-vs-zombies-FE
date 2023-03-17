import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import keycloak from 'src/keycloak';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly router: Router) { }

  canActivate(
    // TODO: relocate to /login when not authenticated
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (keycloak.authenticated !== undefined)
      return keycloak.authenticated;
    return this.router.parseUrl("/login");
  }

}
