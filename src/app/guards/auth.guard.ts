/*
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {KeycloakAuthGuard, KeycloakEventType, KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected override readonly  router :Router,protected  readonly  keycloakService :KeycloakService) {
    super(router,keycloakService);
    console.log("im trigered ")
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      console.log("im on the authenticated clause")
      await this.keycloakService.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];
    console.log(requiredRoles)
    console.log('ima i authenticated'+this.authenticated)


    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => this.roles.includes(role));
  }

}
*/
