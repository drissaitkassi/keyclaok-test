import { Component, OnInit } from '@angular/core';
import {KeycloakSecurityService} from "../services/keycloak-security.service";
import {MyGuardGuard} from "../guards/my-guard.guard";


@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  constructor(public kcSec:KeycloakSecurityService,) { }

  ngOnInit(){
  console.log(this.kcSec.kcInstance.tokenParsed?.resource_access!["my-demo"].roles)
  }


  logout() {
    this.kcSec.kcInstance.logout()
  }
}
