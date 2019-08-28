import { Injectable, Inject, ApplicationRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';
import { fromEvent, Subscription, Observable, Subscriber, of as observableOf, timer, interval, concat } from 'rxjs';
import { take, first } from 'rxjs/operators';

// Browser specific implementation for PWA service. Can interact with the system even to promt user to install the app
@Injectable()
export class PwaService {
    private deferredPromptEvent: any;
    public isAppInstallable: Observable<boolean>;

    constructor(private swUpdate: SwUpdate, @Inject(DOCUMENT) private document: Document, private appRef: ApplicationRef) {
        this.isAppInstallable = observableOf(false);
    }

    public isPwaSupported(): boolean {
        try {
            return this.swUpdate && this.swUpdate.isEnabled;
        } catch {
            return false;
        }
    }

    public subscribeToPromt(): Subscription {
        try {
            if (this.isPwaSupported()) {
                return fromEvent(document.defaultView, 'beforeinstallprompt')
                    .subscribe(event => {
                        // Prevent Chrome 67 and earlier from automatically showing the prompt
                        event.preventDefault();

                        // Stash the event so it can be triggered later.
                        this.deferredPromptEvent = event;
                        this.isAppInstallable = observableOf(true);
                        console.log('beforeinstallprompt!');
                    });
            } else {
                return Subscription.EMPTY;
            }
        } catch (ex) {
            console.error('Error of subscribing to subscribeToPromt. It is used EMPTY subscription as fallback', ex);
            return Subscription.EMPTY;
        }
    }

    public subscribeToCheckForUpdates() {
        try {
            if (this.isPwaSupported()) {
                if (this.isPwaSupported()) {
                    console.log('subscribeToCheckForUpdates');
                    // Initialize to check for updates every 1h
                    const refreshPeriod = 1000 * 60 * 60;
                    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
                    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
                    const updateInterval$ = interval(10 * 1000);
                    const updateIntervalOnceAppIsStable$ = concat(appIsStable$, updateInterval$);

                    return updateIntervalOnceAppIsStable$.subscribe(() => this.swUpdate.checkForUpdate());
                } else {
                    return Subscription.EMPTY;
                }
            }
        } catch (ex) {
            console.error('Error of subscribing to subscribeToCheckForUpdates. It is used EMPTY subscription as fallback', ex);
            return Subscription.EMPTY;
        }
    }

    public subscribeToManageNewAvailableVersions() {
        try {
            if (this.isPwaSupported()) {
                console.log('subscribeToManageNewAvailableVersions');
                // Initialize the logic to inform user about availabele updates for the webapp
                return this.swUpdate.available.subscribe(event => {
                    if (confirm('New version is available. Update?')) {
                        this.swUpdate.activateUpdate().then(() => document.location.reload());
                    }
                });
            } else {
                return Subscription.EMPTY;
            }
        } catch (ex) {
            console.error('Error of subscribing to subscribeToManageNewAvailableVersions. It is used EMPTY subscription as fallback', ex);
            return Subscription.EMPTY;
        }
    }

    // Simple implementation to add banner to home screen if PWA is supported via modal dialog
    public showAddHomePagePopup() {
        if (this.isPwaSupported()) {
            if (this.deferredPromptEvent) {
                if (confirm('Add app to the Home screen?')) {
                    this.addToHomePage();
                }
            }
        }
        return Subscription.EMPTY;
    }

    // This method add banner to home screen
    private addToHomePage() {
        this.deferredPromptEvent.prompt();
        // Wait for the user to respond to the prompt
        this.deferredPromptEvent.userChoice
            .then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    // TODO: Here it is worth tracking user's actions in GA to have ration of accepted A2HS suggestions
                    console.log('User accepted the A2HS prompt!!!');
                    // Deferred event can be used once only. For this reason as soon as user accepted it is set to null
                    this.deferredPromptEvent = null;
                } else {
                    // TODO: Here it is worth tracking user's actions in GA to have ration of declined A2HS suggestions
                    console.log('User dismissed the A2HS prompt...');
                }
            }).catch(error => {
                console.error('Error of accepting A2HS...', error);
            });
    }
}