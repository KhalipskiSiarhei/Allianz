import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PwaService } from './services/pwa.service';
import { IdentityConfigService } from './services/identity-config.service';
// import { MessagingService } from './services/messaging.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pwa-poc!!!';
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              public pwaService: PwaService,
              private identityConfigService: IdentityConfigService,
              /*private messagingService: MessagingService*/) {
  }

  ngOnInit(): void {
    if (this.identityConfigService.initialized) {
      this.subscriptions.push(this.pwaService.subscribeToPromt());
      this.subscriptions.push(this.pwaService.subscribeToCheckForUpdates());
      this.subscriptions.push(this.pwaService.subscribeToManageNewAvailableVersions());
      this.subscriptions.push(this.pwaService.subscribeToAppInstalled());
      // this.subscriptions.push(this.messagingService.subscribeToMessaging());
    } else {
      this.router.navigate(['/not-found']);
    }
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(s => {
        s.unsubscribe();
      });
      this.subscriptions = null;
    }
  }

  public showAddHomePagePopup() {
    this.pwaService.showAddHomePagePopup();
  }

  public get isIdentityConfigInitialized() {
    return this.identityConfigService.initialized;
  }
}
