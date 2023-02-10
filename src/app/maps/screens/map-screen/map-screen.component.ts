import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css'],
})
export class MapScreenComponent {
  
  constructor(private ps: PlacesService) {}

  get isUserLocationReady() {
    return this.ps.isUserLocationReady;
  }
}
