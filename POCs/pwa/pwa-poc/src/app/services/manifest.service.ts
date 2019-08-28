import { Injectable, Inject, ApplicationRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';
import { fromEvent, Subscription, Observable, Subscriber, of as observableOf, timer, interval, concat } from 'rxjs';
import { take, first } from 'rxjs/operators';

@Injectable()
export class ManifestService {
    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    public injectManifest() {
        let manifestElement = this.document.getElementById('manifest.webmanifest');

        if (manifestElement) {
            const jsonManifest = {
                name: 'pwa-poc',
                short_name: 'pwa-poc',
                theme_color: '#1976d2',
                background_color: '#fafafa',
                display: 'standalone',
                scope: this.getScope(),
                start_url: this.getStartUrl(),
                icons: [
                  {
                    src: this.getAssetUrl('/assets/icons/icon-72x72.png'),
                    sizes: '72x72',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-96x96.png'),
                    sizes: '96x96',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-128x128.png'),
                    sizes: '128x128',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-144x144.png'),
                    sizes: '144x144',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-152x152.png'),
                    sizes: '152x152',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-192x192.png'),
                    sizes: '192x192',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-384x384.png'),
                    sizes: '384x384',
                    type: 'image/png'
                  },
                  {
                    src: this.getAssetUrl('/assets/icons/icon-512x512.png'),
                    sizes: '512x512',
                    type: 'image/png'
                  }
                ]
              };
              let stringManifest = JSON.stringify(jsonManifest);
              const blobManifest = new Blob([stringManifest], {type: 'application/json'});
              const urlManifest = URL.createObjectURL(blobManifest);

              manifestElement.setAttribute('href', urlManifest);
        }
    }

    private getStartUrl() {
      return this.document.defaultView.location.href;
    }

    private getScope() {
      return this.document.defaultView.location.href;
    }

    private getAssetUrl(assetUrl: string) {
      return this.document.defaultView.location.href + assetUrl;
    }
}