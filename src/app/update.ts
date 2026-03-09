import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, switchMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { filter } from 'rxjs/operators';
import { VersionReadyEvent } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class Update {
  constructor(
    private swUpdate: SwUpdate,
    appRef: ApplicationRef,
  ) {
    if (this.swUpdate.isEnabled) {
      // Check for updates when the app is stable, then poll periodically
      appRef.isStable
        .pipe(
          first((stable) => stable),
          // Check every 6 hours (adjust as needed)
          // Note: SwUpdate will only trigger if the ngsw.json file has changed
          switchMap(() => interval(6 * 60 * 60 * 1000)),
        )
        .subscribe(() => this.swUpdate.checkForUpdate());

      // Subscribe to available updates and prompt the user
      this.swUpdate.versionUpdates
        .pipe(
          filter(
            (event): event is VersionReadyEvent =>
              event.type === 'VERSION_READY',
          ),
        )
        .subscribe((event) => {
          if (confirm('A new version is available! Do you want to load it?')) {
            this.swUpdate.activateUpdate().then(() => window.location.reload());
          }
        });
    }
  }
}
