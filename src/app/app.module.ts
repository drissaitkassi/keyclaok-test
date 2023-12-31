import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { ProtectedComponent } from './protected/protected.component';
import {RouterModule, Routes} from "@angular/router";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
// import {AuthGuard} from "./guards/auth.guard";
import {KeycloakSecurityService} from "./services/keycloak-security.service";
import { RandomComponent } from './random/random.component';
import {MyGuardGuard} from "./guards/my-guard.guard";


export function KeycloakFacto(keycloak: KeycloakSecurityService) {
  return ()=>
    keycloak.init();

}

// canActivate:[AuthGuard],data:{roles:['USER']}
const appRoutes :Routes=[
  { path: '', component: PublicComponent },
  { path: 'private', component: ProtectedComponent,canActivate:[MyGuardGuard],data:{roles:['ADMIN']}},
  { path: 'random', component: RandomComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    ProtectedComponent,
    RandomComponent
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
    useFactory: KeycloakFacto,
    deps: [KeycloakSecurityService],
    multi:true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
