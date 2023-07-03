import {Injectable} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public profile? :KeycloakProfile
  constructor(public keyService:KeycloakService) {
    this.init()
  }


  private init() {
    this.keyService.keycloakEvents$.subscribe(
      {
        next:(e)=>{
          if (e.type == KeycloakEventType.OnAuthSuccess){
            alert("sucess")
            this.keyService.loadUserProfile().then(profile=>{this.profile=profile})
          }
        }
      }
    )
  }
}
