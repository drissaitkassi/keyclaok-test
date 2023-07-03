import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  constructor(public kcServ:KeycloakService) { }

ngOnInit(){
 this.trigger()
  }

  trigger() {
    this.kcServ.keycloakEvents$.subscribe({
      next: e => {
        alert("sucess")
        console.log('im in the observer '+e.type.toString())
        /*   if (e.type == KeycloakEventType.OnAuthSuccess) {
             console.log("login sucessded")
            // this.userName= this.kcServ.getKeycloakInstance().profile?.username as string;
           }*/
      },
      error:(err)=>console.log("im on erro subscription"),

    });
  }

}
