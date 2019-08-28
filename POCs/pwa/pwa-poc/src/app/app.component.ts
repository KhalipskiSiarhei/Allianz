import { Inject, Component, OnInit } from '@angular/core';
import { PwaService } from './services/pwa.service';
import {ManifestService} from './services/manifest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa-poc!!!';

  constructor(public pwaService: PwaService, private manifestService: ManifestService) {
  }

  ngOnInit(): void {
    this.pwaService.subscribeToPromt();
    this.pwaService.subscribeToCheckForUpdates();
    this.pwaService.subscribeToManageNewAvailableVersions();

    this.manifestService.injectManifest();
  }

  public showAddHomePagePopup() {
    this.pwaService.showAddHomePagePopup();
  }
}
