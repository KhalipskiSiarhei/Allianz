import { Component, OnInit } from '@angular/core';
import { PwaService } from './pwa/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa-poc!!!';

  constructor(public pwaService: PwaService) {
  }

  ngOnInit(): void {
    this.pwaService.subscribeToPromt();
    this.pwaService.subscribeToCheckForUpdates();
    this.pwaService.subscribeToManageNewAvailableVersions();
  }

  public showAddHomePagePopup() {
    this.pwaService.showAddHomePagePopup();
  }
}
