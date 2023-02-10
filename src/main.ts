import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoibGd1YWxwYTgxIiwiYSI6ImNsZHVpbTV4bjA2M2kzb3A3cGM1M2libGkifQ.WOI3LgcVqFR4vQ9QVxCnxQ'

if (!navigator.geolocation) {
  alert('Navegador no soporta Geolocation');
  throw new Error('Navegador no soporta Geolocation');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
