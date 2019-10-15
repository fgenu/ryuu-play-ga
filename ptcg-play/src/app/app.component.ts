import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoginPopupService } from './shared/login-popup/login-popup.service';
import { SessionService } from './shared/session/session.service';
import { SocketService } from './api/socket.service';
import { takeUntilDestroyed } from './shared/operators/take-until-destroyed';

@Component({
  selector: 'ptcg-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public isLoggedIn: boolean = false;
  public isConnected: boolean = false;

  constructor(
    private loginService: LoginPopupService,
    private sessionService: SessionService,
    private socketService: SocketService
  ) { }

  public ngOnInit() {
    this.socketService.connection
      .pipe(takeUntilDestroyed(this))
      .subscribe(connected => {
        this.isConnected = connected;
      });

    this.sessionService.get()
      .pipe(takeUntilDestroyed(this))
      .subscribe(session => {
        this.isLoggedIn = !!session.authToken;
        if (this.isLoggedIn && !this.socketService.enabled) {
          this.socketService.enable(session.authToken);
        }
        if (!this.isLoggedIn && this.socketService.enabled) {
          this.socketService.disable();
        }
      });
  }

  public ngOnDestroy() { }

  login() {
    this.loginService.openDialog();
  }

}
