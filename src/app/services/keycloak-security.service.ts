import { Injectable } from '@angular/core';
import  { KeycloakInstance }from 'Keycloak-js';
import {KeycloakProfile} from "keycloak-js";
declare var Keycloak:any


@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
  public kcInstance!  : KeycloakInstance;

  public  profile? :KeycloakProfile
  constructor() { }

  async init(){
    console.log('initializing keycloak ....')
    this.kcInstance=new Keycloak({
      url: "http://localhost:8080/auth",
      realm: "demo",
      clientId:"my-demo"
    })
    await this.kcInstance.init({
      onLoad:"login-required"
    })
    let loadUserProfile = await this.kcInstance.loadUserProfile();
    this.profile=loadUserProfile
    console.log(loadUserProfile.username)

  }
}
