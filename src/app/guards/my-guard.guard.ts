import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {KeycloakProfile} from "keycloak-js";

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {
public userRoles:string[] | undefined
  constructor(private authServ:KeycloakSecurityService,private router:Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authenicated=this.authServ.kcInstance.authenticated
    if (!authenicated){
      this.router.navigateByUrl("")
      return false
    }else{
      this.userRoles=this.authServ.kcInstance.tokenParsed?.resource_access!["my-demo"].roles
      const requiredRoles = route.data['roles'];
      if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
        return true;
      }
      console.log(this.userRoles)
      return requiredRoles.every((role) => this.userRoles!.includes(role));
    }

  }

}
