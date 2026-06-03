import { ApplicationRef, inject, Service } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, switchMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { filter } from 'rxjs/operators';
import { VersionReadyEvent } from '@angular/service-worker';

@Service()
export class Update {
  private swUpdate = inject(SwUpdate);
  appRef = inject(ApplicationRef);
  constructor() {
    if (this.swUpdate.isEnabled) {
      // Check for updates when the app is stable, then poll periodically
      this.appRef.isStable
        .pipe(
          first((stable:any) => stable),
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
        .subscribe(() => {
          if (confirm('A new version is available! Do you want to load it?')) {
            this.swUpdate.activateUpdate().then(() => window.location.reload());
          }
        });
    }
  }
}
