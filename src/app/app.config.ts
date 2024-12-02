import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './services/interceptors/api-key.interceptor';
import { ENVIRONMENT } from './services/tokens/environment.token';
import { environment } from '../environments/environment';
import { provideState, provideStore } from '@ngrx/store';
import { mediaStateFeature } from './store/media/media.state';
import { MediaEffects } from './store/media/media.effects';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([apiKeyInterceptor])),
    provideStore(),
    provideState(mediaStateFeature),
    provideEffects([MediaEffects]),
    provideStoreDevtools(),
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
};
