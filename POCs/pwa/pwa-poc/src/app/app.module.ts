import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { APP_BASE_HREF, DOCUMENT } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IdentityConfigService } from './services/identity-config.service';
import { PwaService } from './services/pwa.service';
import { ManifestService } from './services/manifest.service';
// import { MessagingService } from './services/messaging.service';

export function initApp(identityConfigService: IdentityConfigService, manifestService: ManifestService, document: Document) {
  if (identityConfigService.init(document)) {
    manifestService.injectManifest();
  }

  return () => {
    return new Promise((resolve) => {
      resolve();
    });
  };
}

export function getBaseLocation(identityConfigService: IdentityConfigService) {
  if (identityConfigService.initialized) {
    return identityConfigService.baseHref;
  }
  return '/';
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-fcm-worker.js', { enabled: environment.production }),
  ],
  providers: [
    IdentityConfigService,
    PwaService,
    ManifestService,
    // MessagingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [IdentityConfigService, ManifestService, DOCUMENT],
      multi: true
    },
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseLocation,
      deps: [IdentityConfigService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
