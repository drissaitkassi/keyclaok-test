import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {SecurityService} from "../services/security.service";

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {

  constructor(public secService:SecurityService) { }

 async ngOnInit() {
    await console.log(this.secService.profile?.username)

  }



}
