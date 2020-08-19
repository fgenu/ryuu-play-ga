import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { filter, switchMap } from 'rxjs/operators';

import { ApiInterceptor } from './api.interceptor';
import { ApiService } from './api.service';
import { AvatarService } from './services/avatar.service';
import { CardsService } from './services/cards.service';
import { DeckService } from './services/deck.service';
import { GameService } from './services/game.service';
import { LoginService } from './services/login.service';
import { MainService } from './services/main.service';
import { ProfileService } from './services/profile.service';
import { SharedModule } from '../shared/shared.module';
import { SocketService } from './socket.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    ApiService,
    AvatarService,
    CardsService,
    DeckService,
    GameService,
    LoginService,
    MainService,
    ProfileService,
    SocketService
  ]
})
export class ApiModule {
  constructor(
    mainService: MainService,
    socketService: SocketService
  ) {

    socketService.connection
      .pipe(
        filter(connected => connected),
        switchMap(() => mainService.getCoreInfo())
      )
      .subscribe(coreInfo => mainService.init(coreInfo));

  }
}
