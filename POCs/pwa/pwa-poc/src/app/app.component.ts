import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PwaService } from './services/pwa.service';
import { IdentityConfigService } from './services/identity-config.service';
import { MessagingService } from './services/messaging.service';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public partner = '';
  public country = '';
  public policyId = '';
  public message: Observable<any>;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private titleService: Title,
              public pwaService: PwaService,
              private identityConfigService: IdentityConfigService,
              public messagingService: MessagingService) {
  }

  ngOnInit(): void {
    if (this.identityConfigService.initialized) {
      // tslint:disable-next-line: max-line-length
      this.titleService.setTitle(`${this.identityConfigService.partner} - ${this.identityConfigService.country} - ${this.identityConfigService.policyId}`);

      this.partner = this.identityConfigService.partner;
      this.country = this.identityConfigService.country;
      this.policyId = this.identityConfigService.policyId;

      this.subscriptions.push(this.pwaService.subscribeToPromt());
      this.subscriptions.push(this.pwaService.subscribeToCheckForUpdates());
      this.subscriptions.push(this.pwaService.subscribeToManageNewAvailableVersions());
      this.subscriptions.push(this.pwaService.subscribeToAppInstalled());

      if (this.messagingService.isSupported) {
        this.messagingService.requestPermission(this.identityConfigService.id);
        this.subscriptions.push(this.messagingService.subscribeToMessaging());
        this.subscriptions.push(this.messagingService.receiveMessage());
        this.message = this.messagingService.currentMessage;
        console.log('Messaging is supported!!!');
      } else {
        console.log('Messaging is NOT supported...');
      }
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
