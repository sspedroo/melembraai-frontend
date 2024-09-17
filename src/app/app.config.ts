import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { routes } from './app.routes';
import { authProvider } from './http-interceptor/auth-provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    authProvider, // Token Interceptor
  ],
};
