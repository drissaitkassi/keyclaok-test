import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { ProtectedComponent } from './protected/protected.component';
import {RouterModule, Routes} from "@angular/router";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {AuthGuard} from "./guards/auth.guard";


export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'demo',
        clientId: 'my-demo',
      },
      loadUserProfileAtStartUp:true,
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe:true

      },

    });
}

const appRoutes :Routes=[
  { path: '', component: PublicComponent },
  { path: 'private', component: ProtectedComponent ,canActivate:[AuthGuard],data:{roles:['USER']}},
]

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes,
      {enableTracing: true}),
    KeycloakAngularModule,

  ],
  providers: [ {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
