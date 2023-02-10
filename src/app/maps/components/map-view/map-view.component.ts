import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';

import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(private ps: PlacesService, private ms: MapService) {}

  ngAfterViewInit(): void {
    if (!this.ps.userLocation) throw Error('Invalid userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.ps.userLocation, // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    const popup = new Popup().setHTML(`
        <h6>Aqui estoy</h6>
        <span>En este lugar del mundo</span>
        `);

    new Marker({ color: 'red' })
      .setLngLat(this.ps.userLocation)
      .setPopup(popup)
      .addTo(map);

    //acceso global al mapa
    this.ms.setMap(map);
  }
}
