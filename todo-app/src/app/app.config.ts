import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import {  provideHttpClient } from '@angular/common/http';

export const appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ],
  imports: [ FormsModule ]
};