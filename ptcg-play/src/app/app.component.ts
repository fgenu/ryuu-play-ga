import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameState } from 'ptcg-server';
import { Observable } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';

import { ProfileService } from './api/services/profile.service';
import { SessionService } from './shared/session/session.service';
import { SocketService } from './api/socket.service';
import { User } from './shared/session/user.interface';
import { takeUntilDestroyed } from './shared/operators/take-until-destroyed';

@Component({
  selector: 'ptcg-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public isLoggedIn = false;
  public loggedUser: User | undefined;
  public gameStates$: Observable<GameState[]>;
  private authToken$: Observable<string>;

  constructor(
    private profileService: ProfileService,
    private sessionService: SessionService,
    private socketService: SocketService,
  ) {
    this.authToken$ = this.sessionService.get(session => session.authToken);
    this.gameStates$ = this.sessionService.get(session => session.gameStates);
  }

  public ngOnInit() {
    // Connect to websockets after when logged in
    this.authToken$
      .pipe(takeUntilDestroyed(this))
      .subscribe(authToken => {
        this.isLoggedIn = !!authToken;

        // Connect to websockets
        if (this.isLoggedIn && !this.socketService.isEnabled) {
          this.socketService.enable(authToken);
        }
        if (!this.isLoggedIn && this.socketService.isEnabled) {
          this.socketService.disable();
        }

        // Refresh user profile when user logs in
        this.refreshLoggedUser(authToken);
      });
  }

  public ngOnDestroy() { }

  private refreshLoggedUser(authToken: string) {
    if (!authToken) {
      this.sessionService.set({ loggedUser: undefined });
      return;
    }

    const tokenChanged$ = this.authToken$.pipe(skip(1));
    this.profileService.getMe()
    .pipe(
        takeUntilDestroyed(this),
        takeUntil(tokenChanged$)
      )
      .subscribe(response => {
        this.sessionService.set({ loggedUser: response.user });
      });
  }

}
