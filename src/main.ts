import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { App } from './app/app';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(App, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
