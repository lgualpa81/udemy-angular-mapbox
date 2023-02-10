import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css'],
})
export class BtnMyLocationComponent {
  constructor(private ms: MapService, private ps: PlacesService) {}

  goToMyLocation() {
    if (!this.ps.isUserLocationReady)
      throw Error('No hay ubicación de usuario');
    if (!this.ms.isMapReady) throw Error('No mapa disponible');
    
    this.ms.flyTo(this.ps.userLocation!);
  }
}
